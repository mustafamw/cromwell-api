let { mongoDb } = require('../mongoDb/mongoDb');
const config = require('../config/confg');
const HttpStatus = require('http-status-codes');

class UserService {

  constructor() {
    const dbo = mongoDb.db.db(config.application.name);
    this.collection = dbo.collection("users");
  }

  checkUserNameExist(username) {
    return new Promise((resolve, reject) => {
      this.collection.findOne({ username }, function (err, res) {
        if (err) {
          return reject({
            message: "Technical Error",
            code: HttpStatus.INTERNAL_SERVER_ERROR
          });
        }
        if (res && res != null) {
          return reject({
            message: "Username already taken",
            code: HttpStatus.CONFLICT
          });
        }
        return resolve();
      });
    });
  }

  async signup(data) {

    const username = data.username;
    const password = data.password;

    return new Promise(async (resolve, reject) => {
      try {
        await this.checkUserNameExist(username);

        this.collection.insertOne({
          username: username,
          password: password
        }, function (err, res) {
          if (err) {
            return reject({
              message: "Technical Error",
              code: HttpStatus.INTERNAL_SERVER_ERROR
            });
          }
          return resolve({
            message: "Successfully Signed Up"
          });
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  async login(data) {

    const username = data.username;
    const password = data.password;

    return new Promise(async (resolve, reject) => {
      this.collection.findOne({
        username: username,
        password: password
      }, function (err, res) {
        if (err) {
          return reject({
            message: "Technical Error",
            code: HttpStatus.INTERNAL_SERVER_ERROR
          });
        }
        if (res === null) {
          return reject({
            message: "Incorrect Login",
            code: HttpStatus.UNAUTHORIZED
          });
        }
        return resolve();
      });
    });
  }
}


module.exports = { UserService }

