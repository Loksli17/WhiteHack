import { DataCheck, NumberParamCheck, SaveUploadedFile } from '../libs/decorators';

import { Router, Request, Response } from "express";
import User                          from "../models/User";
import ErrorMessage                  from "../libs/error";
import Logger                        from "../libs/log/Logger";


export default class UserController {

    private static router: Router = Router();
    

    @DataCheck <{limit: number; offset: number}> (['limit', 'offset'])
    private static async getOne(req: Request, res: Response): Promise<void> {

        let user : User | null;

        try {
            user = await User.findOne({
                where: {id: 1},
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({error: ErrorMessage.db()});
            return;
        }

        if(user == null){
            res.status(404).send({error: ErrorMessage.notFound('Пользователь')});
            return;
        }

        Logger.info({url: req.originalUrl, status: 200});
        res.status(200).send({user: user});
    }

    
    public static routes(): Router {

        this.router.post('/get-one', this.getOne);

        return this.router;
    }
}