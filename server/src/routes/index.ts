
import { Router as ExpressRouter } from 'express';

import ExampleController from '../controllers/ExampleController';
import EventController   from '../controllers/EventController';
import UserController    from '../controllers/UserController';
import RegionController  from '../controllers/RegionController';


export default class Router {
    
    private static router: ExpressRouter = ExpressRouter();

    public static get routes(){
        
        this.router.use('/example',  ExampleController.routes());
        this.router.use('/event',    EventController.routes());
        this.router.use('/user',     UserController.routes());
        this.router.use('/region',   RegionController.routes());

        return this.router;
    }

}