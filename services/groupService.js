const constants = require("../config/constants");
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
        console.log(err)
        reject(err)
      })
    })
  },
  getOnlyGroupById: (params) => {
    return new Promise((resolve, reject) => {
      if(params.id == null || params.id == 'undefined') {
        reject(constants.MISSING_PARAMS.REALM_NAME)
      }
      models.group.findOne({
        where: params,
        raw: true
      }).then(group => {
        if(group){
          resolve(group)
        } else {
          reject(null)
        }
      }).catch(err => {
        console.log(err)
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
  getAllGroupsOffsetLimit: (params) => {
    return new Promise((resolve, reject) => {
      models.group.findAll({
        limit: parseInt(params.limit),
        offset: parseInt(params.offset),
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
      if(params.id == null || params.id == 'undefined') {
        reject(constants.MISSING_PARAMS.GROUP_ID)
      }
      models.group.destroy({
        where: params
      }).then(group => {
        if(group) {
          resolve(group)
        } else {
          reject(constants.NOT_PRESENT.GROUP)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateGroup: (params) => {
    return new Promise((resolve, reject) => {
      if(params.id == null || params.id == 'undefined') {
        reject(constants.MISSING_PARAMS.GROUP_ID)
      }
      models.group.update(
        params.updateParams,
        { 
          where: { id: params.id } 
        }
      ).then(group => { 
        if(group && group[0]){
          resolve(group);
        } else {
          reject(constants.NOT_PRESENT.GROUP)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}






