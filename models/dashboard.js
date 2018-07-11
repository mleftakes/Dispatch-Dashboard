

module.exports = function(sequelize, DataTypes) {
  var Dispatch = sequelize.define("Dispatch", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Checkin: {
      type: Date,
      allowNull: false
    },
    Checkout:{
      type: Date,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
    }
  });
  return Dispatch;
};
