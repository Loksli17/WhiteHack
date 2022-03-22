import { Optional, Model, DataTypes } from 'sequelize';
import sequelize                      from '../config/database';


interface EventImageAttributes {
    id     : number;
    file   : string;
    eventId: number;
}


export interface EventImageCreationAttributes extends Optional<EventImageAttributes, 'id'> {}


class EventImage extends Model<EventImageAttributes, EventImageCreationAttributes> implements EventImageAttributes {
    public id!       : number;
    public file!     : string;
    public eventId!: number;
}

EventImage.init({

    id: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
    },

    eventId: {
        type: DataTypes.INTEGER.UNSIGNED,
    },

    file: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        validate : {
            notNull: {
                msg:  'Название файла не может быть пустым!',
            },
        }
    },

}, {
    tableName: 'eventImage',
    sequelize,
    timestamps: false,
});


export default EventImage;