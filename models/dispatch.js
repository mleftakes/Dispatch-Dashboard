/* eslint-env node, es6 */

// Dispatch models

// The Dispatch has a name attribute of type DataTypes.String
// Checkin and Checkout are type date

module.exports = (sequelize, DataTypes) => {
  const Dispatch = sequelize.define('Dispatch', {
    checkin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_shipper: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    bol_image: {
      type: DataTypes.STRING,
    },
  });

  Dispatch.associate = (db) => {
    db.Driver.hasMany(db.Dispatch, { foreignKey: 'driver' });
    db.Dispatch.belongsTo(db.Driver, { foreignKey: 'driver' });
  };

  return Dispatch;
};
