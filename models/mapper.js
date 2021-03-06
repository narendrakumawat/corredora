module.exports = function(sequelize, DataTypes) {
	var Mapper = sequelize.define('mapper', {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    saml_attribute: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_attribute: {
      type: DataTypes.STRING,
      allowNull: true
    }
	}, {
		timestamp: true
	});

	Mapper.associate = function(models) {
    Mapper.belongsTo(models.group, {foreignKey: 'group_id'});
    Mapper.belongsTo(models.idp_data, { foreignKey: 'group_id', targetKey: 'group_id' })
    Mapper.belongsTo(models.sp_data, { foreignKey: 'group_id', targetKey: 'group_id' })
	}  
	return Mapper;
};