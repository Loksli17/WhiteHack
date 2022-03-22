import { Optional, Model, DataTypes, Association, CreateOptions } from 'sequelize';
import sequelize    from '../config/database';
import Event        from './Event';


interface UserAttributes{
    id  : number;
    name: string;
}


export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

    public id!  : number;
    public name!: string;

    public events?: Array<Event>;

    public static associations: {
        events: Association<User, Event>;
    }

}


User.init({

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
    //     beforeSave: (User: User, options: CreateOptions<User>) => {
    //         User.set('name',  parser.escapeTags(User.get('name')));
    //         User.set('color', parser.escapeTags(User.get('color')));

    //         let checkPrice: boolean = Number.isNaN(Number(User.get('price')))

    //         if(checkPrice){
    //             User.set('price', 0);
    //         }
                
    //         User.set('description', parser.escapeTags(
    //             User.get('description'), 
    //             ['p', 'strong', 'em', 'u', 's', 'br', 'ol', 'li', 'ul'],
    //         ));
    //     },
    // },

    tableName: 'user',
    sequelize,
    timestamps: false,
});


User.hasMany(Event, {
    sourceKey : 'id',
    foreignKey: 'userId',
    as        : 'events' 
});

Event.belongsTo(User);


export default User;