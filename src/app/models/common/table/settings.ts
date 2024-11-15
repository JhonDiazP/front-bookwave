import { Columns } from "./columns";

export class Settings {
    constructor(
        public columns: { [key: string]: Columns },
        public order: string[],
    ){}
}