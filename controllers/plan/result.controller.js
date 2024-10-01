import { col, fn } from "sequelize";
import db from "../../models/index.js";

const Vote = db.vote;
const Plan = db.plan;

const resultController = async (req, res) => {
	const { planId } = req.params;

	let plan;
	try {
		plan = await Plan.findOne({ where: { id: planId } });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	if (!plan) {
		return res.status(404).json({
			success: false,
			data: { message: "Plan not found." },
		});
	}

	const now_ms = new Date().getTime();
	const deadline_ms = new Date(plan.deadline).getTime();
	if (now_ms < deadline_ms) {
		return res.status(400).json({
			success: false,
			data: { message: "The deadline hasn't come yet." },
		});
	}

	const votes = {
		inFavor: 0,
		opposed: 0,
	};
	try {
		const planVoteCount = await Vote.findAll({
			attributes: [
				"value",
				[db.sequelize.fn("COUNT", db.sequelize.col("value")), "count"],
			],
			where: { planId },
			group: ["value"],
			raw: true,
		});
		planVoteCount.forEach((element) => {
			if (element.value === 1) {
				votes.inFavor = +element.count;
			} else {
				votes.opposed = +element.count;
			}
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	return res.status(200).json({
		success: true,
		data: { votes },
	});
};

export default resultController;
