import { DataCheck, NumberParamCheck, SaveUploadedFile } from '../libs/decorators';

import { Router, Request, Response } from "express";
import Region                        from "../models/Region";
import ErrorMessage                  from "../libs/error";
import Logger                        from "../libs/log/Logger";



export default class RegionController {

    private static router: Router = Router();
    

    private static async getAll(req: Request, res: Response): Promise<void> {

        let regions: Array<Region> = [];

        try {
            regions = await Region.findAll();
        } catch (error) {
            console.log(error);
            res.status(400).send({error: ErrorMessage.db()});
            return;
        }

        Logger.info({url: req.originalUrl, status: 200});
        res.status(200).send({regions: regions});
    }

    
    public static routes(): Router {

        this.router.post('/get-all', this.getAll);

        return this.router;
    }
}