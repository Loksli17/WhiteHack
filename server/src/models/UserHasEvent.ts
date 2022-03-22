import {Optional, Model, DataTypes} from 'sequelize';
import sequelize                    from '../config/database';
import User                         from '../models/User';
import Event                        from '../models/Event';


interface UserHasEventAttributes {
    id     : number;
    userId : number;
    eventId: number;
}


export interface UserHasEventCreationAttributes extends Optional<UserHasEvent, 'id'> {}


class UserHasEvent extends Model<UserHasEventAttributes, UserHasEventCreationAttributes> implements UserHasEventCreationAttributes{
    public id!    : number;
    public userId!: number;
    public eventId!: number;
}

UserHasEvent.init({
    
    id: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
    },

    userId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    eventId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    
}, {
    tableName: 'user_has_event',
    sequelize,
    timestamps: false,
});


// User.belongsToMany(
//     Event, 
//     {
//         through: UserHasEvent,
//         foreignKey: 'userId',
//     }
// );

// Event.belongsToMany(
//     User,
//     {
//         through: UserHasEvent,
//         foreignKey: 'eventId',
//     }
// );

export default UserHasEvent;