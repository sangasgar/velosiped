const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Posts }) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'user_id' });
      this.belongsTo(Posts, { foreignKey: 'post_id' });

    }
  }
  Comments.init({
    comment: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
