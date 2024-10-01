const isAdmin = (req, res, next) => {
	if (req.user.role === "ADMIN") {
		next();
	} else {
		return res.status(403).json({
			success: false,
			data: {
				message: "Only admins can define plans.",
			},
		});
	}
};

export default isAdmin;
