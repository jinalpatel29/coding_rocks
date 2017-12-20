export class User {
    constructor(
        public id: number = null,
        public fname: string = "",
        public lname: string = "",
        public email: string = "",
        public pwd: string = "",
        public addr: string = "",
        public DOB: Date = null,
        public partner: any = null,
      //  public interests: any[] = []

    ) { }
}

