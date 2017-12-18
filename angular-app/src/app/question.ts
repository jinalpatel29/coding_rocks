export class Question{
    constructor(
        public question: string='',
        public author: string='',       
        public options: string[] = [],
        public createdAt: string ='',
        public updatedAt: string = ''
    ){}
}

