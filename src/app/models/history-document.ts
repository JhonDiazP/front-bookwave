
export class HistoryDocument {
    constructor(
        public id: number,
        public name: string,
        public status_name: string,
        public date: string,
        public observation: string,
        public url_file: string
    ) {}
}