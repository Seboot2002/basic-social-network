export class Publication{

    constructor(
        public _id: string,
        public text: string,
        public imagePath: string,
        public created_at: string,
        public user: any
    ){}

}