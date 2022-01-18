export class RegisterInfo{
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;

    constructor(username: string, password: string, firstName: string, lastName: string){
                    this.username = username;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.role = 'USER';
                    this.password = password;
                }
}