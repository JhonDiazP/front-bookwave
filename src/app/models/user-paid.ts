import { Period } from "./period";
import { StatusPaid } from "./status-paid";
import { UserProject } from "./user-project";


export class UserPaid {
    constructor(
        public id: number,
        public user_project_id: number,
        public status_paid_id: number,
        public code: number,
        public amount: number,
        public observation: string,
        public period_id: number,
        public created_at: Date,
        public updated_at: Date,
        public user_project?: UserProject,
        public status_paid?: StatusPaid,
        public period?: Period
    ){}
}
