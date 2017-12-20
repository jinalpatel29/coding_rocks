export class Event {
    // start:Date;
    end:Date;
    location:string;
    // summary:string;
    description:string; 
    status:string;
    reminders:any[];
    attachments:any[];
    color={primary:'blue',secondary:'green'}
 
    interest:string;//points / frequency
    creator:'';
    receiver:'';

    constructor(
        public title:string,
        public start:Date,
    ){};
    delete=function(){};
    insert=function(){};
    update=function(){};
}