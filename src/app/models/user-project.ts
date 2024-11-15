import { Position } from "./position";
import { Project } from "./project";
import { User } from "./user";
import { UserRole } from "./user-role";


export class UserProject {
    constructor(
        public id: number,
        public project_id: number,
        public user_id: number,
        public position_id: number,
        public user_role_id: number,
        public status: boolean,
        public user?: User,
        public position?: Position,
        public project?: Project,
        public user_role?: UserRole

    ){}
}
