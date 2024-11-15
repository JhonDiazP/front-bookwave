import { User } from "./user";

export class UserRole {

    constructor(
        public id: number,
        public user_id: number,
        public role_id: number,
        public user?: User,
    ) {}
}
