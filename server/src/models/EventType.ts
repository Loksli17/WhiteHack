import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';

import sequelize from '../config/database';
import Event     from './Event';
import parser    from '../libs/parser';


interface EventTypeAttributes {
    id  : number;
    name: string;
}


export interface EventTypeCreationAttributes extends Optional<EventTypeAttributes, 'id'> {}


class EventType extends Model<EventTypeAttributes, EventTypeCreationAttributes> implements EventTypeAttributes {
    public id!  : number;
    public name!: string;

    public event?: Array<Event>;

    public static associations: {
        events: Association<EventType, Event>;
    }
}


EventType.init({

    id: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
    },

    name: {
        type     : DataTypes.STRING(255),
        allowNull: false,

        unique   : {
            name: 'name_UNIQUE',
            msg : 'Тип события с подобным названием уже был создан!',
        },

        validate : {

            notNull: {
                msg:  'Название должно содержать от 4 то 30 символов!',
            },
            len: {
                args: [4, 30],
                msg: 'Название должно содержать от 4 то 30 символов!',
            },
        }
    },
}, {
    hooks: {
        beforeSave: (EventType: EventType, options: CreateOptions<EventType>) => {
            EventType.set('name', parser.escapeTags(EventType.get('name'), ));
        },
    },

    tableName: 'EventType',
    sequelize,
    timestamps: false,
});


EventType.hasMany(Event, {
    sourceKey : 'id',
    foreignKey: 'eventTypeId',
    as        : 'events' 
});

Event.belongsTo(EventType);

export default EventType;