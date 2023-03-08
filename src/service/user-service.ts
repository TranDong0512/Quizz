import {AppDataSource} from "../data-source";
import {User} from "../model/user"

export class UserService {
    private userService: any;

    constructor() {
            this.userService = AppDataSource.getRepository(User)
    }
    findAll = async () => {
        let users = await this.userService.query(`select * from user`)
        return users
    }
    findOneUserByUsername = async (username) => {
        let users = await this.userService.query(`select *
                                                  from user
                                                  where userName = '${username}'`)
        return users
    }

    findOneUserByUserEmail = async (userEmail)=>{
        let email = await this.userService.query(`select *
                                                  from user
                                                  where userEmail = '${userEmail}'`)
        return email
    }
    register = async (data) => {
        console.log(data,222)
        let registers = await this.userService.query(`
                                insert into user(userName, userEmail, userPassword, role)
                                VALUES ('${data.userName}','${data.userEmail}','${data.userPassword}',${data.role})`)
        return registers
    }
    remove = async (id) => {
        let remove = await this.userService.query(`delete from user where userId = ${id}`)
        return remove
    }
    edit = async (id) => {
        let user = await this.userService.query(`select * from user where userId = '${id}'`)
        console.log(user,111)

        if(user[0].role == 0) {
            await this.userService.query(`UPDATE user
                                                       SET role = 1
                                                       where userId = '${id}'`)
        } else if (user[0].role == 1) {
            await this.userService.query(`UPDATE user
                                                       SET role = 0
                                                       where userId = '${id}'`)
        }

        let users = await this.userService.query(`select * from user where userId = '${id}'`)
        console.log(users,22222)
        return users
    }
}









