const planFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const Plan = sequelize.define("plan", {
		title: {
			type: DataTypes.STRING,
			unique: true,
		},
		deadline: {
			type: DataTypes.DATE,
		},
	});

	return Plan;
};

export default planFactory;
