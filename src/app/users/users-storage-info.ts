import { filter } from "rxjs";
import { UsersInfo } from "./users-info";

export class UsersStorageInfo{

    users: UsersInfo[] = [];

    constructor(users: UsersInfo[]){
        for(var i = 0; i < users.length; i ++){
            if(users[i].role == 'USER'){
                this.users.push(users[i]);
            }
        }
    }

    add(users: UsersInfo){
        this.users.push(users);
    }

    remove(id: number){
        const index = this.findById(id);
        if(index != -1){
            this.users.splice(index, 1);
        }
    }

    findById(id: number){
        for(var i = 0; i < this.users.length; i ++){
            if(this.users[i].id == id){
                return i;
            }
        }
        return -1;
    }

    change(id: number, user: UsersInfo){
        const index = this.findById(id);
        if(index != -1){
            this.users[index] = user;
        }
    }

    getById(id: number){
        return this.users[id];
    }

    getUsers(){
        return this.users;
    }

    setUsers(users: UsersInfo[]){
        this.users = users;
    }
}