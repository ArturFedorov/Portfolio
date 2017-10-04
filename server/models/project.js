'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    line: DataTypes.STRING,
    domain: DataTypes.STRING,
    description: DataTypes.STRING,
    teamcount: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Project.hasMany(models.Schedule);
        Project.belongsToMany(models.Technology,{through: 'project_technology'});
      }
    }
  });
  return Project;
};