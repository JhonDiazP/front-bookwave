
export class ImageService {
    constructor(
        public id: number,
        public service_id: string,
        public path: string,
        public is_main: boolean,
    ) {}
}