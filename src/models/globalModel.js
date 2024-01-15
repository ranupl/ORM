module.exports = (sequelize, DataTypes) => {
  const Global = sequelize.define("global", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Global.associate = (models) => {
    Global.belongsToMany(models.User, {
      through: models.Mapping,
      foreignKey: "globalId",
    });
  };

  return Global;
};
