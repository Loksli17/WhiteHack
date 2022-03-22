import { DataCheck, NumberParamCheck, SaveUploadedFile } from '../libs/decorators';

import { Router, Request, Response } from "express";
import Event                         from "../models/Event";
import User                          from "../models/User";
import EventType                     from "../models/EventType";
import ErrorMessage                  from "../libs/error";
import Logger                        from "../libs/log/Logger";



export default class ExampleController {

    private static router: Router = Router();
    

    @DataCheck <{limit: number; offset: number}> (['limit', 'offset'])
    private static async getAll(req: Request, res: Response): Promise<void> {

        let 
            limit : number         = req.body.limit,
            offset: number         = req.body.offset,
            events: Array<Event> = [];

        try {
            events = await Event.findAll({
                attributes: ['id', 'date', 'time', 'address', 'description'],
                limit     : Number(limit), 
                offset    : Number(offset),
                order     : [['id', 'desc']],
                include   : [{model: EventType}, {model: User, }]
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({error: ErrorMessage.db()});
            return;
        }

        Logger.info({url: req.originalUrl, status: 200});
        res.status(200).send({events: events});
    }

    
    public static routes(): Router {

        this.router.post('/get-all', this.getAll);

        return this.router;
    }
}