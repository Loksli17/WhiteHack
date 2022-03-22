export type EventAttributes = {
    id         : number;
    date       : Date;
    time       : string;
    address    : string;
    description: string;
    authorId   : number;
    eventTypeId: number;

    EventType: {
        id: number;
        name: string;
    }
}