import express, { Request, Response, NextFunction } from "express";

import { createServer, Server } from 'http';
import config                   from './config';
import Router                   from './routes';
import cors                     from 'cors';
import fileUpload               from 'express-fileupload';
import cookieParser             from 'cookie-parser';
import { errorLogger }          from './libs/log/winston';
import LogMessage               from "./libs/log/LogMessage";


//! i wanna test it and replace in another file
class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}


class App {

    private static   instance: App;
    private          app     : express.Application;
    private readonly port    : number;
    private          server  : Server;
    
    
    private constructor(){
        this.app    = express();
        this.port   = config.app.port || 3000;
        this.server = createServer(this.app);
        
        this.createMiddlwares();
        this.app.use('/', Router.routes);
        this.app.use(this.logErrors);
        this.app.use(this.errorHandler);
    }


    private createMiddlwares(): void {
        this.initCors();
        this.app.use(cookieParser(config.secret.session));
        this.app.use(express.json({limit: config.app.jsonDataLimit}));
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({extended: true, limit: config.app.jsonDataLimit}));
        this.app.use(fileUpload());
    }


    private initCors(): void {
        this.app.use(cors(
            {
                origin        : config.cors.origin,
                methods       : config.cors.methods,
                credentials   : true,
                exposedHeaders: ['set-cookie']
            }
        ));
    }

    private logErrors(err: HttpException, req: Request, res: Response, next: NextFunction): void {
        console.error(err);
        next(err);
    }

    private errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction): void {
        console.error(err);
        errorLogger.error(LogMessage.create({url: req.originalUrl, status: err.status}));
        res.status(500).send({error: err});
    }


    public init(): void {
        this.server.listen(this.port, () => console.log(config.app.startMessage +  " " +  this.port));
    }

    public static get Instance(): App {
        return this.instance || (this.instance = new this());
    }
}


const app: App = App.Instance;
app.init();