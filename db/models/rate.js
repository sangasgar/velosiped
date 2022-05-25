const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts }) {
      // define association here
      this.belongsTo(Posts, { foreignKey: 'post_id' });
    }
  }
  Rate.init({
    grade: DataTypes.FLOAT,
    post_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};
