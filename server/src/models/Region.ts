import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';

import sequelize from '../config/database';
import Event     from './Event';
import parser    from '../libs/parser';


interface RegionAttributes {
    id             : number;
    name           : string;
    pollutionDegree: number;
    longitude      : number;
    lattitude      : number;
}


export interface RegionCreationAttributes extends Optional<RegionAttributes, 'id'> {}


class Region extends Model<RegionAttributes, RegionCreationAttributes> implements RegionAttributes {
    
    public id!             : number;
    public name!           : string;
    public pollutionDegree!: number;
    public longitude!      : number;
    public lattitude!      : number;

    public event?: Array<Event>;

    public static associations: {
        events: Association<Region, Event>;
    }
}


Region.init({

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
        },
    },

    pollutionDegree: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    longitude: {
        type     : DataTypes.FLOAT,
        allowNull: false,
    },

    lattitude: {
        type     : DataTypes.FLOAT,
        allowNull: false,
    },

}, {
    hooks: {
        beforeSave: (Region: Region, options: CreateOptions<Region>) => {
            Region.set('name', parser.escapeTags(Region.get('name'), ));
        },
    },

    tableName: 'Region',
    sequelize,
    timestamps: false,
});


Region.hasMany(Event, {
    sourceKey : 'id',
    foreignKey: 'regionId',
    as        : 'events' 
});

Event.belongsTo(Region);

export default Region;