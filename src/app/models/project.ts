
export class Project {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public date_start: Date,
        public date_finish: Date,
        public responsible: string,
        public status: boolean
    ) {}
}