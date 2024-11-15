import { Item } from "./item";
import { Permission } from "./permission";
import { Role } from "./role";

export class ItemRolePermission {
    constructor(
        public id: number,
        public item_id: number,
        public role_id: number,
        public permission_id: number,
        public role: Role,
        public item: Item,
        public permission: Permission
    ) {}
}
