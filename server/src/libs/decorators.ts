import Logger           from "../libs/log/Logger";
import ErrorMessage     from "../libs/error";
import Query            from "../libs/query";
import { UploadedFile } from "express-fileupload";
import Store            from "./store";


// const authHandler = async (fileApi: boolean, ...args: any[]): Promise<boolean> => {
    
//     const 
//         req: any = args[0][0],
//         res: any = args[0][1]; 

//     let checkAccessTokenResult: boolean = await AuthController.checkAccessToken(req);
    
//     if(!checkAccessTokenResult) {

//         if(fileApi){
//             res.status(401).send({msg: ErrorMessage.notValidJWT(), tempFile: Store.requestData(req.files.image.name)});
//         } else {
//             res.status(401).send({msg: ErrorMessage.notValidJWT()});
//         }
       
//         Logger.auth({url: req.originalUrl, status: 401, reason: ErrorMessage.notValidJWT()});
//         return false;
//     }

//     return true;
// }


const dataCheckHandler = async <QueryData extends Record<string, any>> (params: Array<string>, ...args: any[]): Promise<boolean> => {

    const 
        req: any = args[0][0],
        res: any = args[0][1];

    let
        QueryData : QueryData              = req.body as any,
        dataErrors: Array<keyof QueryData> = [];

    dataErrors = Query.checkData(QueryData, params);

    if(dataErrors.length){
        res.status(400).send({error: ErrorMessage.dataNotSended(String(dataErrors[0])), msg: 'Данные отсутсвуют'});
        Logger.warn({url: req.originalUrl, status: 400, reason: ErrorMessage.dataNotSended(String(dataErrors[0]))});
        return false;
    }

    return true;
}


const queryNumberParamHanlder = (params: Array<string>, ...args: any[]): boolean => {

    const 
        req: any = args[0][0],
        res: any = args[0][1];

    for(let i: number = 0; i < params.length; i++) {

        let reqParam: number = Number(req.params[params[i]]);
        
        if(Number.isNaN(reqParam)){
            res.status(400).send({error: ErrorMessage.dataNotSended('id')});
            Logger.warn({url: req.originalUrl, status: 400, reason: ErrorMessage.dataNotSended('id')});
            return false;
        }
    };

    return true;
}


const saveUploadedFileHanlder = (field: string, ...args: any[]): boolean => {

    const 
        req: any = args[0][0],
        res: any = args[0][1];

    let file: UploadedFile | undefined = undefined;

    if(req.files != undefined){
        file = (req.files.image as UploadedFile)
    }

    if(file == undefined){
        file = Store.getFile({path: field, filename: req.body.filename});
    }

    if(file == undefined){
        res.status(400).send(ErrorMessage.file());
        Logger.warn({url: req.originalUrl, status: 400, reason: ErrorMessage.file()});
        return false;
    }

    Store.add({path: field, filename: file.name, file: file});
    return true;
}



const 
    // AuthRequired = (obj: {fileApi: boolean} = {fileApi: false}) => {

    //     return (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

    //         const method = descriptor.value;

    //         descriptor.value = async function(...args: any[]){
    //             const auth: boolean = await authHandler(obj.fileApi, args);
    //             if(auth) {
    //                 const data = await method.apply(this, args);
    //                 return data;
    //             }
    //         }

    //         return descriptor;
    //     }
    // },


    DataCheck = <QueryData extends Record<string, any>> (params: Array<string>) => {
        return (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

            const method = descriptor.value;

            descriptor.value = async function(...args: any[]){
                const result: boolean = await dataCheckHandler<QueryData>(params, args);
                if(result) {
                    const data = await method.apply(this, args);
                    return data;
                }
            }

            return descriptor;
        }
    },

    SaveUploadedFile = (field: string) => {
        return (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

            const method = descriptor.value;

            descriptor.value = async function(...args: any[]){
                const result: boolean = saveUploadedFileHanlder(field, args);
                if(result){
                    const data = await method.apply(this, args);
                    return data;
                }
            }

            return descriptor;
        }
    },

    NumberParamCheck = (params: Array<string>) => {
        return (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

            const method = descriptor.value;

            descriptor.value = async function(...args: any[]){
                const result: boolean = queryNumberParamHanlder(params, args);
                if(result) {
                    const data = await method.apply(this, args);
                    return data;
                }
            }

            return descriptor;
        }
    };



export {
    // AuthRequired,
    DataCheck,
    NumberParamCheck,
    SaveUploadedFile,
}