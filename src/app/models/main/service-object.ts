export class ServiceObject {
    status: any;
    constructor(public entity?: string, public id?: number | string, public data?: any, public attributes?: any, public message?: string) {
      this.entity = entity;
      this.id = id;
      this.data = data;
      this.attributes = attributes;
      this.message = message;
    }
  }
  