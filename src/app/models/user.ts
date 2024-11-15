import { Role } from "./role";

export class User {
    constructor(
        public document_type_id: number,
        public document: string,
        public firstname: string,
        public lastname: string,
        public municipality_id: number,
        public gender_id: number,
        public status: boolean,
        public phone: string,
        public email: string,
        public password: string,
        public id?: number,
        public middlelastname?: string,
        public middlefirstname?: string,
        public roles?: Role[]
    ) {}
}