import { DataCheck, NumberParamCheck, SaveUploadedFile } from '../libs/decorators';

import { Router, Request, Response } from "express";
import Event                         from "../models/Event";
import User                          from "../models/User";
import EventImage                    from '../models/EventImage';
import EventType                     from "../models/EventType";
import ErrorMessage                  from "../libs/error";
import Logger                        from "../libs/log/Logger";



export default class ExampleController {

    private static router: Router = Router();
    

    @DataCheck <{limit: number; offset: number}> (['limit', 'offset', 'regionId'])
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
                where     : {regionId: 1},
                include   : [{model: EventType}, {model: User}]
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({error: ErrorMessage.db()});
            return;
        }

        Logger.info({url: req.originalUrl, status: 200});
        res.status(200).send({events: events});
    }


    private static async getOne(req: Request, res: Response): Promise<void> {

        let 
            event: Event | null,
            id   : number = Number(req.params.id);

            console.log(req.params);

        if(id == undefined) {
            res.status(400).send({error: ErrorMessage.dataNotSended('id')});
            return;
        }

        try {
            event = await Event.findOne({where: {id: id}, include: [{model: EventImage, as: 'images'}]});
        } catch (error) {
            console.error(error);
            res.status(400).send({error: ErrorMessage.db()});
            return;
        }

        res.send({event: event});
    }

    
    public static routes(): Router {

        this.router.post('/get-all',     this.getAll);
        this.router.get('/get-one/:id', this.getOne);

        return this.router;
    }
}