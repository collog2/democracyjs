const isVoter = (req, res, next) => {
	if (req.user.role === "VOTER") {
		next();
	} else {
		return res.status(403).json({
			success: false,
			data: {
				message: "Only voters are permitted.",
			},
		});
	}
};

export default isVoter;
