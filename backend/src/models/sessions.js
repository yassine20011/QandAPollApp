// session.js
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  return Session;
};
