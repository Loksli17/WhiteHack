export type EventAttributes = {
    
    id         : number;
    date       : Date;
    time       : string;
    address    : string;
    description: string;
    userId     : number;
    eventTypeId: number;
    regionId   : number;
    name       : string;
    points     : number;
    tools      : string;
    longitude  : number;
    lattitude  : number;

    EventType: {
        id: number;
        name: string;
    }

    images: Array<{
        file   : string;
        id     : number;
        eventId: number
    }>
}