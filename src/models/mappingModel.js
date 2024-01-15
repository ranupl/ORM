module.exports = (sequelize, DataTypes) => {
  const Mapping = sequelize.define("Mapping", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    globalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Mapping;
};
