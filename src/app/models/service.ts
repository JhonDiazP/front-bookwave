import { ImageService } from "./image-service";
import { Review } from "./review";
import { Municipality } from "./territories/municipality";

export class Service {
    constructor(
        public id: number,
        public service_status_id: number,
        public name: string,
        public description: string,
        public price: number,
        public category_id: number,
        public municipality_id: number,
        public user_id: string,
        public municipality?: Municipality,
        public reviews_avg_rating?: number,
        public reviews?: Review[],
        public image_services?: ImageService[],
        public photo_principal?: any,
        public photo_one?: any,
        public photo_two?: any,
    ) {}
}