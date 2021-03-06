const constants = require("../../config/constants");
const models = require('../../models');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

module.exports = {
  createUser: (params) => {
    return new Promise((resolve, reject) => {
      if(params.email == null || params.password == null) {
        reject(constants.MISSING_PARAMS.DEFAULT_ERROR);
      }
      params['user_token'] = uuidv4();
      models.admin_users.findOne({
        where: {email: params.email}
      }).then(usr => {
        if(!usr) {
          bcrypt.hash(params.password, constants.PASSWORD_SALT_ROUND, function(err, hash) {
            params.password = hash;
            models.admin_users.create(params).then(user => {
                resolve(user);
            }).catch(err => {
              reject(err);
            })
          });
        } else {
          resolve(constants.PRESENT.USER);
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  getUser: (params) => {
    return new Promise((resolve, reject) => {
      if(params.email == null) {
        reject(constants.MISSING_PARAMS.DEFAULT_ERROR);
      }
      models.admin_users.findOne({
        where: {email: params.email}
      }).then(usr => {
        if(usr){
          bcrypt.compare(params.password, usr.password, function(err, result) {
            if(result === true){
              resolve(usr)
            } else {
              reject("Password mismatch")
            }
          });
        } else {
          reject(constants.NOT_PRESENT.USER)
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  getUserForBasicAuth: (params) => {
    return new Promise((resolve, reject) => {
      if(params.email == null) {
        reject(constants.MISSING_PARAMS.DEFAULT_ERROR);
      }
      models.admin_users.findOne({
        where: params
      }).then(usr => {
        if(usr){
          resolve(usr); 
        } else {
          reject(constants.NOT_PRESENT.USER)
        }
      }).catch(err => {
        reject(err);
      })
    })
  }
}