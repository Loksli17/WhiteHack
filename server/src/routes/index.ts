
import { Router as ExpressRouter } from 'express';

import ExampleController from '../controllers/ExampleController';
import EventController   from '../controllers/EventController';


export default class Router {
    
    private static router: ExpressRouter = ExpressRouter();

    public static get routes(){
        
        this.router.use('/example',  ExampleController.routes());
        this.router.use('/event',    EventController.routes());

        return this.router;
    }

}