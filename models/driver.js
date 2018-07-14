module.exports = function(sequelize, DataTypes) {
  var Driver = sequelize.define("Driver", {
    name: {
      type: DataTypes.STRING,
      // If a driver is to be created, they must have a name
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    }
  });
  return Driver;
};
