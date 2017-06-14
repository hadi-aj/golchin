

export class User {
    profile: {
        user_id: number,
        name: string,
        public_email:string,
        gravatar_email:string,
        gravatar_id:string,
        location:string,
        website:string,
        bio:string,
        timezone:string,
        image: string
    };
    token: string;
}