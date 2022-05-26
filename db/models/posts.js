const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Rate, Comments }) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'user_id' });
      this.hasMany(Rate, { foreignKey: 'post_id' });
      this.hasMany(Comments, { foreignKey: 'post_id' });
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    start: DataTypes.STRING,
    finish: DataTypes.STRING,
    location: DataTypes.STRING,
    lengthRoad: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
