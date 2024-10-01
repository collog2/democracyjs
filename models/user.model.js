const userFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const User = sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM(["ADMIN", "VOTER"]),
			allowNull: false,
		},
	});

	return User;
};

export default userFactory;
