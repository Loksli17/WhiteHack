
import { Router as ExpressRouter } from 'express';

import ExampleController   from '../controllers/ExampleController';


export default class Router {
    
    private static router: ExpressRouter = ExpressRouter();

    public static get routes(){
        
        this.router.use('/example',  ExampleController.routes());

        return this.router;
    }

}