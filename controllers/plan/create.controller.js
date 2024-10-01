import db from "../../models/index.js";

const Plan = db.plan;

const createPlanController = async (req, res) => {
	const { title, deadline } = req.body;
	if (!title || !deadline) {
		return res.status(400).json({
			success: false,
			data: { message: "Provide all of the inputs." },
		});
	}

	const now_ms = new Date().getTime();
	const deadline_ms = new Date(deadline).getTime();
	if (now_ms > deadline_ms) {
		return res.status(400).json({
			success: false,
			date: {
				message: "Deadline has already passed.",
			},
		});
	}

	let newPlanRaw;
	try {
		newPlanRaw = await Plan.create({
			title,
			deadline: new Date(deadline).toISOString(),
		});
	} catch (error) {
		if (error.errors["0"].type === "unique violation") {
			return res.status(409).json({
				success: false,
				data: { message: "Title already exists." },
			});
		}
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	const newPlan = newPlanRaw.get({ plain: true });

	return res.status(201).json({
		success: true,
		data: {
			plan: newPlan,
		},
	});
};

export default createPlanController;
