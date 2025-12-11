const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class UsageLog extends Model {}

UsageLog.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        action: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT, 
            allowNull: true,
        },
        stateAfter: {
            type: DataTypes.STRING, 
            defaultValue: "GOOD"
        }
    },
    {
        sequelize: connection,
        tableName: "usage_logs",
        underscored: true
    }
);

module.exports = UsageLog;