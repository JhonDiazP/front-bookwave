export class Menu {
    constructor(
        public id: number,
        public label: string,
        public icon: string,
        public routerLink: string,
        public children?: Menu[],
    ) {}
}