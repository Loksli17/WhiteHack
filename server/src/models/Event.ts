import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';

import sequelize    from '../config/database';
import parser       from '../libs/parser';
import EventImage   from './EventImage';
import User         from './User';


export interface EventForm {
    example: {
        date       : Date;
        time       : string;
        address    : string;
        description: string;
    }
}


interface EventAttributes{
    id         : number;
    date       : Date;
    time       : string;
    address    : string;
    description: string;
    userId     : number;
    eventTypeId: number;
    regionId   : number;
    name       : string;
    points     : number;
}


export interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}


class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {

    public id!         : number;
    public date!       : Date;
    public time!       : string;
    public address!    : string;
    public description!: string;
    public userId!     : number;
    public eventTypeId!: number;
    public regionId!   : number;
    public name!       : string;
    public points!     : number;

    public images?: Array<EventImage>;
    
    public static associations: {
        images: Association<Event, EventImage>;
    }
}


Event.init({

    id: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
    },

    date: {
        type     : DataTypes.DATE,
        allowNull: false,
    },

    time: {
        type     : DataTypes.STRING(20),
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Введите правильное время!',
            },
            len: {
                args: [8, 8],
                msg: 'Введите правильное время!',
            },
        }
    },

    name: {
        type     : DataTypes.STRING(500),
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Введите правильное время!',
            },
            len: {
                args: [8, 8],
                msg: 'Введите правильное время!',
            },
        }
    },

    points: {
        type     : DataTypes.INTEGER,
        allowNull: false,
    },

    address: {
        type     : DataTypes.STRING(500),
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Цвет должен содержать от 10 то 500 символов!',
            },
            len: {
                args: [10, 500],
                msg: 'Цвет должен содержать от 10 то 500 символов!',
            },
        }
    },

    description: {
        type     : DataTypes.STRING(500),
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Описание должно содежрать от 10 то 500 символов!',
            },
            len: {
                args: [10, 500],
                msg: 'Описание должно содежрать от 10 то 500 символов!',
            },
        }
    },

    userId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    eventTypeId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    regionId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }

}, {

    hooks: {
        beforeSave: (example: Event, options: CreateOptions<Event>) => {
  
            example.set('description', parser.escapeTags(
                example.get('description'), 
                ['p', 'strong', 'em', 'u', 's', 'br', 'ol', 'li', 'ul'],
            ));
        },
    },

    tableName: 'event',
    sequelize,
    timestamps: false,
});


Event.hasMany(EventImage, {
    sourceKey : 'id',
    foreignKey: 'eventId',
    as        : 'images', 
});

EventImage.belongsTo(Event);

export default Event;