"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",

      // sequelize /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */,
      // timestamps: false /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */,
      // underscored: false /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */,
      // modelName: "User" /* 모델 이름을 설정. */,
      // tableName: "users" /* 데이터베이스의 테이블 이름. */,
      // paranoid: false /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */,
      // charset: "utf8" /* 인코딩 */,
      // collate: "utf8_general_ci",
    }
  );
  return User;
};
