export class jwtResponse{
    token: string;
    username: string;
    role: string;

    constructor(role: string, username: string, token: string){
        this.token = token;
        this.username = username;
        this.role = role;
    }
}