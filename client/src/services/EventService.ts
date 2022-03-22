import Service from "@/libs/Service";
import axios   from "redaxios"; 
// import { LoadingFile }                      from '@/components/FileUpload/types';
// import { FormDataView }                     from '@/components/Form/types';


// const normalExample = (example: Example): Example => {
//     example.isShowView   = example.isShow ? "публичный" : "скрытый";
//     example.price        += " руб.";
//     example.typeHairView = example.TypeHair?.name;
//     return example;
// }


// const decorators = {

//     normalExamples: () => {
//         return Service.createDecoratorAfter((response: AxiosResponse): AxiosResponse | undefined => {
//             if(response == undefined || response.status != 200) return response;
//             response.data.examples = response.data.examples.map(normalExample);
//             return response;
//         });
//     },

//     normalExample: () => {
//         return Service.createDecoratorAfter((response: AxiosResponse): AxiosResponse | undefined => {
//             if(response == undefined || response.status != 200) return response;
//             response.data.example = normalExample(response.data.example);
//             return response;
//         })
//     }
// }


export default class EventService extends Service {

    // @decorators.normalExamples()
    public static async getAll(data: {limit: number, offset: number, regionId: number}): Promise<any | undefined> {
        
        const response: any | void = await axios.post('/event/get-all', data)
        .catch((reason: any) => {
            if(reason.response == undefined) return;
        });

        if(response == undefined) return;

        return response;
    }


    // public static async getAmount(data: {statusTypeId: number}): Promise<any | undefined> {
    //     const response: any | void = await axios.post(
    //         `/example/get-amount`,
    //         data,
    //     )
    //     .catch((reason: any) => {
    //         if(reason.response == undefined) return;
    //     });

    //     if(response == undefined) return;

    //     return response;
    // }


    // public static async getAmountPublic(): Promise<AxiosResponse | undefined> {
    //     const response: AxiosResponse | void = await axios.get(`/example/get-amount-public`)
    //     .catch((reason) => {
    //         if(reason.response == undefined) return;
    //     });

    //     if(response == undefined) return;

    //     return response;
    // }


    // public static async add(data: {example: FormDataView}): Promise<AxiosResponse | undefined> {

    //     const response: AxiosResponse | void = await axios.put(
    //         `/example/add`, 
    //         data,
    //         { headers: { Authorization: store.getters.getJWT } }
    //     )
    //     .catch((reason: AxiosError) => {
    //         if(reason.response == undefined) return;
    //         this.errorMessage(reason.response.status);
    //     });

    //     if(response == undefined) { console.error('Bad response'); return undefined; }

    //     this.checkResponse(response, [200, 422]);

    //     return response;
    // }

}