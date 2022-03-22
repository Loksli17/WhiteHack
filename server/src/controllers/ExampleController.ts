import { DataCheck, NumberParamCheck, SaveUploadedFile } from '../libs/decorators';

import { Router, Request, Response } from "express";
import Example                       from "../models/Example";
import ErrorMessage                  from "../libs/error";
import Logger                        from "../libs/log/Logger";
import Store                         from "../libs/store";



export default class ExampleController {

    private static router: Router = Router();


    private static catchLog(url: string, error: any): void {
        Logger.warn({
            url   : url, 
            status: 400, 
            reason: ErrorMessage.db(),
            error : error,
        });
    }
    

    @DataCheck <{limit: number; offset: number}> (['limit', 'offset'])
    private static async getAllPublic(req: Request, res: Response): Promise<void> {

        let 
            limit   : number         = req.body.limit,
            offset  : number         = req.body.offset,
            examples: Array<Example> = [];

        try {
            examples = await Example.findAll({
                attributes: ['id', 'name', 'price', 'color', 'isShow', 'description'],
                where     : {isShow: true},
                limit     : Number(limit), 
                offset    : Number(offset),
                order     : [['id', 'desc'], ['images', 'id', 'desc']],
            });
        } catch (error) {
            res.status(400).send({error: ErrorMessage.db()});
            ExampleController.catchLog(req.originalUrl, error);
            return;
        }


        res.status(200).send({examples: examples});
    }

    
    public static routes(): Router {
        this.router.post('/get-all-public',this.getAllPublic);

        return this.router;
    }
}