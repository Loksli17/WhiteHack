import CryptoJS from "crypto-js";
import { Op }   from "sequelize/dist";
import xss, { IWhiteList }      from "xss";



export default {

    createFileName: (filename: string): string => {
        
        let                                    
            regType: RegExp                  = /\.[A-Za-z0-9]+$/g, 
            regRes : RegExpMatchArray | null = filename.match(regType),
            name   : string                  = "",
            type   : string                  = "";

        if(regRes == null) throw new Error('Bad filename');
            
        type = regRes[0];

        name = filename.replace(`${type}`, "");
        name = CryptoJS.SHA224(`${name}`).toString();
        return `${name}${type}`;
    },

    
    hashString: (str: string): string => {
        return str;
    },


    hashPasswordSha512: (str: string): string => {
        return CryptoJS.SHA512(str).toString();
    },


    getStatusCond(statusTypeId: number): Record<any, any> {

        let statusCond: Record<any, any> = {};

         switch (statusTypeId){

            case 1: //* all records
                statusCond = {
                    [Op.or]: [
                        {isShow: true},
                        {isShow: false},
                        {isShow: null},
                    ],
                }
                break;

            case 2: //* public records
                statusCond = { isShow: true };
                break;

            case 3: //* hidden records
                statusCond = {
                    [Op.or]: [
                        {isShow: false},
                        {isShow: null},
                    ],
                }
                break;
        }

        return statusCond;
    },


    deleteTags(str: string): string {
        let regTag : RegExp = new RegExp(`<.*?>`, 'g');
        return str.replace(regTag, '');
    },


    escapeTags(str: string, allowTags: Array<string> = []): string {

        let whiteList: IWhiteList = {};

        allowTags.forEach((tag: string) => {
            whiteList[tag] = [];
        })

        let resultText: string = xss(str, {
            whiteList: whiteList,
        });

        return resultText; 
    }
}