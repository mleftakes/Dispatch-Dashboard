module.exports = function(sequelize, DataTypes) {
  var driver = sequelize.define("driver", {
    driver: {
      type: DataTypes.STRING,
      // If a driver is to be created, they must have a name
      allowNull: false
    },
    Image: {
      type: DataTypes.STRING,
    }
  });
  return driver;
};
