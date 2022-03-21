
export interface LogMessageOptions {
    status? : number;
    reason? : string;
    ip?     : string;
    url     : string;
    client? : string;
    addInfo?: string;
    error?  : string;
};


export default class LogMessage {

    public static create(obj: LogMessageOptions): string {

        let log: string = `[${obj.url}] - (status: ${obj.status})`;

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && key != 'url' && key != 'status') {
                const element: string | number | undefined = obj[key as keyof LogMessageOptions];
                if(element != undefined) log += ` | ${key}: ${element}`;
            }
        }

        return log;
    }
}