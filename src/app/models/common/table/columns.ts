export class Columns {
    constructor(
        public title: string,
        public type: string,
        public fieldPath?: string,
        public valuePrepareFunction?: (value: any, row: any) => any,
        public renderComponent?: any
    ){}
}