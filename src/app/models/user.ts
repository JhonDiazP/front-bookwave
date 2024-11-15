import { Role } from "./role";
import { Municipality } from "./territories/municipality";

export class User {
    constructor(
        public identification_type_id: number,
        public identification: string,
        public first_name: string,
        public last_name: string,
        public municipality_id: number,
        public gender_id: number,
        public status: boolean,
        public phone: string,
        public email: string,
        public password: string,
        public id?: string,
        public middle_last_name?: string,
        public middle_first_name?: string,
        public roles?: Role[],
        public municipality?: Municipality
    ) {}
}