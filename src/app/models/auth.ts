export class Auth {

    constructor(
        public access_token: string,
        public token_type: string,
        public expires_in: string,
        public init_time_exp: string,
    ) {}
}
