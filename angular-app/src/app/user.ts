export class User {
    constructor(
        public id: number = null,
        public firstName: string = "",
        public lastName: string = "",
        public email: string = "",
        public pwd: string = "",
        public addr: string = "",
        public dob: Date = null,
        public point: Number = 0,
        public partner: any = null,
      //  public interests: any[] = []

    ) { }
}

