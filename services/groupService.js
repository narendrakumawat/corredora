var constants = require("../config/constants");
const models = require('../models');

module.exports = {
  getGroupByName: (params) => {
    return new Promise((resolve, reject) => {
      if(params.group_name == null || params.group_name == 'undefined') {
        reject(constants.MISSING_PARAMS.REALM_NAME)
      }
      models.group.findOne({
        where: params,
        raw: true
      }).then(group => {
        if(group){
          resolve(group)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getGroupById: (params) => {
    return new Promise((resolve, reject) => {
      if(params.id == null || params.id == 'undefined') {
        reject(constants.MISSING_PARAMS.REALM_NAME)
      }
      models.group.findOne({
        where: params,
        include: [{model: models.idp_data}],
        raw: true
      }).then(group => {
        if(group){
          resolve(group)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllGroups: () => {
    return new Promise((resolve, reject) => {
      models.group.findAll({
        include: [{model: models.idp_data}],
        raw: true
      }).then(groups => {
        resolve(groups)
      }).catch(err => {
        reject(err)
      })
    })
  },
  createGroup: (params) => {
    return new Promise((resolve, reject) => {
      if(params.group_name == null || params.group_name == 'undefined') {
        reject(constants.MISSING_PARAMS.REALM_NAME)
      }
      models.group.findOne({
        where: {group_name: params.group_name},
        raw: true
      }).then(group => {
        if(group){
          reject("Group Already Exist")
        } else {
          models.group.create(params).then(group => { 
            resolve(group);
          }).catch(err => {
            reject(err)
          })
        }
      }).catch(err => {
        console.log(err)
        reject(err);
      })
    })
  },
  deleteGroup: (params) => {
    return new Promise((resolve, reject) => {
      if(params.group_id == null || params.group_id == 'undefined') {
        reject(constants.MISSING_PARAMS.GROUP_ID)
      }
      models.group.destroy({
        where: params
      }).then(group => {
        resolve(group)
      }).catch(err => {
        reject(err)
      })
    })
  }
}