import fileUpload, { UploadedFile } from "express-fileupload";

interface RequestItem{
    path    : string;
    filename: string;
}

interface StoreItem extends RequestItem{
    file: UploadedFile;
}


export default class Store {

    private static storeArray: Array<StoreItem> = [];
    
    public static add(newItem: StoreItem): void {
        const item: StoreItem | undefined = Store.storeArray.find((item: StoreItem) => item.filename == newItem.filename && item.path == newItem.path);
        if(item != undefined) return;
        Store.storeArray.push(newItem);
    }

    public static getFile(reqItem: RequestItem): UploadedFile | undefined {
        const item: StoreItem | undefined = Store.storeArray.find((item: StoreItem) => item.filename == reqItem.filename && item.path == reqItem.path);
        if(item == undefined) return undefined;
        return item.file;
    }

    public static remove(filename: string): void {
        Store.storeArray = Store.storeArray.filter((item: StoreItem) => item.filename != filename)
    }

    public static requestData(filename: string): RequestItem | undefined {
        const storeItem: StoreItem | undefined = Store.storeArray.find((item: StoreItem) => item.filename === filename);
        return storeItem == undefined ? undefined : {path: storeItem.path, filename: storeItem.filename};
    }
}