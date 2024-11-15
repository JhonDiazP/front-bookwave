import { Item } from "./item";
import { Permission } from "./permission";
import { Role } from "./role";

export class Permissions {
    constructor(
        public id: number,
        public item: Item,
        public item_id: number,
        public permission: Permission,
        public permission_id: number,
        public role: Role,
        public role_id: number
    ){}
}
