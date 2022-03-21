import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';
import sequelize    from '../config/database';
import parser       from '../libs/parser';
// import ExampleImage from './ExampleImage';


export interface ExampleForm {
    example: {
        price      : number;
        name       : string;
        color      : string;
        isShow     : boolean;
        description: string;
        typeHairId : number;
    }
}


interface ExampleAttributes{
    id         : number;
    name       : string;
    price      : number;
    color      : string;
    isShow     : boolean; 
    typeHairId : number | null;
    description: string;
}

export interface ExampleCreationAttributes extends Optional<ExampleAttributes, 'id'> {}


class Example extends Model<ExampleAttributes, ExampleCreationAttributes> implements ExampleAttributes {

    public id!         : number;
    public name!       : string;
    public price!      : number;
    public color!      : string;
    public isShow!     : boolean; 
    public typeHairId! : number | null;
    public description!: string;

    // public images?: Array<ExampleImage>   
    
    // public static associations: {
    //     images: Association<Example, ExampleImage>;
    // }
}


Example.init({

    id: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
    },

    typeHairId: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },

    name: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        
        validate : {
            notNull: {
                msg: 'Название должно содержать от 5 то 50 символов!',
            },

            len: {
                args: [5, 30],
                msg: 'Название должно содержать от 5 то 50 символов!',
            },
        }
    },

    price: {
        type     : DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Стоимость должна быть от 0 до 2147483647!',
            },
            min: {
                args: [0],
                msg: 'Минимальное значение: 0!',
            },
            max: {
                args: [2147483647],
                msg: 'Максимальное значение: 2147483647!',
            }
        }
    },

    color: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Цвет должен содержать от 5 то 30 символов!',
            },
            len: {
                args: [5, 30],
                msg: 'Цвет должен содержать от 5 то 30 символов!',
            },
        }
    },

    description: {
        type     : DataTypes.STRING(700),
        allowNull: false,
        validate : {
            notNull: {
                msg: 'Описание должно содержать от 30 до 700 символов!',
            },

            length(value: string){
                let clearValue: string = parser.deleteTags(value);
                
                if(clearValue.length < 30 || clearValue.length > 700) {
                    throw new Error('Описание должно содержать от 30 до 700 символов!');
                }
            },
        }
    },

    isShow: {
        type: DataTypes.BOOLEAN,
    },

}, {
    hooks: {
        beforeSave: (example: Example, options: CreateOptions<Example>) => {
            example.set('name',  parser.escapeTags(example.get('name')));
            example.set('color', parser.escapeTags(example.get('color')));

            let checkPrice: boolean = Number.isNaN(Number(example.get('price')))

            if(checkPrice){
                example.set('price', 0);
            }
                
            example.set('description', parser.escapeTags(
                example.get('description'), 
                ['p', 'strong', 'em', 'u', 's', 'br', 'ol', 'li', 'ul'],
            ));
        },
    },
    tableName: 'example',
    sequelize,
    timestamps: false,
});


// Example.hasMany(ExampleImage, {
//     sourceKey : 'id',
//     foreignKey: 'exampleId',
//     as        : 'images', 
// });


// ExampleImage.belongsTo(Example);

export default Example;