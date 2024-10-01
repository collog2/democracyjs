const userFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const User = sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM(["ADMIN", "VOTER"]),
		},
	});

	return User;
};

export default userFactory;
