const indexController = (req, res, next) => {
	return res.status(200).json({
		success: true,
		data: { message: "hello world!" },
	});
};

export default indexController;
