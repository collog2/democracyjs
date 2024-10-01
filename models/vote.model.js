const voteFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const Vote = sequelize.define("vote", {
		value: {
			type: DataTypes.BOOLEAN,
		},
	});

	return Vote;
};

export default voteFactory;
