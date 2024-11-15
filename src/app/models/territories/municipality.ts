import { Region } from "./region";

export class Municipality {
    constructor(
        public id: number,
        public name: string,
        public departament_id: number,
        public departament: Region
    ) {}
}