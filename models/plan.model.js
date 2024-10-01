const planFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const Plan = sequelize.define("plan", {
		title: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		deadline: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	return Plan;
};

export default planFactory;
