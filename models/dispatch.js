// Dispatch models

// The Dispatch has a name attribute of type DataTypes.String
// Checkin and Checkout are type date

module.exports = function(sequelize, DataTypes) {
  var Dispatch = sequelize.define("Dispatch", {
    checkin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkout:{
      type: DataTypes.DATE,
      allowNull: true
    },
    is_shipper: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    bol_image:{
      type: DataTypes.STRING,
    }
  });

  Dispatch.associate = function(db) {
    db.Driver.hasMany(db.Dispatch, { foreignKey: 'driver' });
    db.Dispatch.belongsTo(db.Driver, { foreignKey: 'driver' });
  };

  return Dispatch;
};
