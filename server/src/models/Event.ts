import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';
import sequelize    from '../config/database';
import parser       from '../libs/parser';


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
    authorId   : number;
    eventTypeId: number;
}


export interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}


class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {

    public id!         : number;
    public date!       : Date;
    public time!       : string;
    public address!    : string;
    public description!: string;
    public authorId!   : number;
    public eventTypeId!: number;
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

    authorId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    eventTypeId: {
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

export default Event;