export class Event {
    start:Date;
    end:Date;
    location:string;
    // summary:string;
    description:string;
    status:string;
    reminders:any[];
    attachments:any[];
 
    interest:string;//points / frequency
    creator:'';
    receiver:'';

    constructor(
        public summary:string,
    ){};
    delete=function(){};
    insert=function(){};
    update=function(){};
}