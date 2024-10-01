import db from "../../models/index.js";

const Vote = db.vote;

const voteController = async (req, res) => {
	const { value } = req.body;
	const { planId } = req.params;

	let previousVote;
	try {
		previousVote = await Vote.findOne({
			where: { userId: req.user.id, planId },
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			data: { message: "server error" },
		});
	}

	if (previousVote) {
		return res.status(403).json({
			success: false,
			data: { message: "Every user gets one vote per plan." },
		});
	}

	if (!planId || typeof value !== "boolean") {
		return res.status(400).json({
			success: false,
			data: { message: "Provide all of the inputs." },
		});
	}

	let vote;
	try {
		vote = await Vote.create({ userId: req.user.id, planId, value });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: true,
			data: { message: "server error" },
		});
	}

	return res.status(201).json({
		success: true,
		data: { vote },
	});
};

export default voteController;
