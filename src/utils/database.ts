import { Project } from "../modules/Projects/project";
import { User } from "../modules/User/user";

const users: User[] = [
  {
    userName: "admin",
    password: "1234",
  },
];

export async function getUsers(){
    return users;
}


const projects:Project[] = [];