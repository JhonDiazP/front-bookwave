export class Item {
    constructor(
        public id: number,
        public item_parent_id: number,
        public name: string,
        public route: string,
        public icon: string,
        public subitems: any,
    ){}
}
