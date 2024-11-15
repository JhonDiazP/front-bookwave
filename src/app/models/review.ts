export class Review {
    constructor(
        public id: number,
        public user_id: string,
        public service_id: string,
        public rating: number,
        public comment: string,
        public created_at: string,
    ) {}
}