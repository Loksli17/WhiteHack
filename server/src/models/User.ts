import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';
import sequelize    from '../config/database';



interface UserAttributes{
    id  : number;
    name: string;
}


export interface ExampleCreationAttributes extends Optional<UserAttributes, 'id'> {}


class Example extends Model<UserAttributes, ExampleCreationAttributes> implements UserAttributes {

    public id!  : number;
    public name!: string;

}


Example.init({

    id: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
    },

    name: {
        type     : DataTypes.STRING(255),
        allowNull: false,
        
        validate : {
            notNull: {
                msg: 'Имя пользователя должно содержать от 5 до 50 символов!',
            },

            len: {
                args: [5, 50],
                msg: 'Имя пользователя должно содержать от 5 до 50 символов!',
            },
        }
    },
}, {

    // hooks: {
    //     beforeSave: (example: Example, options: CreateOptions<Example>) => {
    //         example.set('name',  parser.escapeTags(example.get('name')));
    //         example.set('color', parser.escapeTags(example.get('color')));

    //         let checkPrice: boolean = Number.isNaN(Number(example.get('price')))

    //         if(checkPrice){
    //             example.set('price', 0);
    //         }
                
    //         example.set('description', parser.escapeTags(
    //             example.get('description'), 
    //             ['p', 'strong', 'em', 'u', 's', 'br', 'ol', 'li', 'ul'],
    //         ));
    //     },
    // },

    tableName: 'user',
    sequelize,
    timestamps: false,
});