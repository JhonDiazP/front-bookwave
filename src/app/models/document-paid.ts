import { StatusDocument } from "./status-document";
import { TypeFilePaid } from "./type-file-paid";
import { UserPaid } from "./user-paid";

export class DocumentPaid {
    constructor(
        public id: number,
        public user_paid_id: number,
        public document_type_id: number,
        public status_document_id: number,
        public observation: string,
        public url_file: string,
        public user_paid?: UserPaid,
        public type_file_paid? : TypeFilePaid,
        public status_document? : StatusDocument
    ){}
}
