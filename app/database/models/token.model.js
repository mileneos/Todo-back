const Sequelize = require('sequelize');
const { sequelize } = require('..');
const { nanoid } = require('nanoid');

class Token extends Sequelize.Model { }

Token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        value: {
            type: Sequelize.STRING,
            defaultValue: () =>  nanoid(128)
            
        },
    }, { sequelize: sequelize, underscored: true, modelName: 'token', timestamps: true }
);

module.exports = Token