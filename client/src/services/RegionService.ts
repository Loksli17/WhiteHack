import Service from "@/libs/Service";
import axios   from "redaxios"; 


export default class EventService extends Service {

    
    // @decorators.normalExamples()
    public static async getAll(): Promise<any | undefined> {
        
        const response: any | void = await axios.post('/region/get-all')
        .catch((reason: any) => {
            if(reason.response == undefined) return;
        });

        if(response == undefined) return;

        return response;
    }
}