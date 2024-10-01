const voteFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const Vote = sequelize.define("vote", {
		value: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});

	return Vote;
};

export default voteFactory;
