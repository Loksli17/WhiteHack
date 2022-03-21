import util                  from 'util';
import fs                    from 'fs';
import { UploadedFile }      from 'express-fileupload';
import sharp, { OutputInfo } from 'sharp';
import config                from '../config';


export default class FileFacade {

    private static promisifyExist : any = util.promisify(fs.exists);
    private static promisifyUnlink: any = util.promisify(fs.unlink);


    public static async exist(path: string): Promise<boolean> {
        return await FileFacade.promisifyExist(path);
    }


    public static async remove(path: string): Promise<void> {
        await FileFacade.promisifyUnlink(path);
    }


    public static async move(file: UploadedFile, path: string): Promise<void> {
        await file.mv(path);
    }

    //* think about Output info
    public static async resizeImage(basicPath: string, newPath: string, sizeStatus: 'small' | 'large'): Promise<void> {
        const size = sizeStatus == 'small' ?  config.file.scaleWidthSmall : config.file.scaleWidthLarge;
        let data: OutputInfo = await sharp(basicPath).resize(size).toFile(newPath);
    }
}