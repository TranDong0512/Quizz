import {AppDataSource} from "../data-source";
import {User} from "../model/user"

export class UserService {
    private userService: any;

    constructor() {
        AppDataSource.initialize().then(connection => {
            console.log('Connected Database')
            this.userService = connection.getRepository(User)
        })
    }
    findAll = async () => {
        let users = await this.userService.find()
        return users
    }
    findOneUserByUsername = async (username) => {
        let users = await this.userService.query(`select *
                                                  from users
                                                  where username = '${username}'`)
        return users
    }
    register = async (data) => {
        let registers = await this.userService.save(data)
        return registers
    }
    remove = async (id) => {
        let remove = await this.userService.delete(id)
        return remove
    }
    edit = async (id) => {
        let user = await this.userService.query(`select * from users where id = '${id.id}'`)

        if(user[0].status == 'true') {
            await this.userService.query(`UPDATE users
                                                       SET status = 'false'
                                                       where id = '${id.id}'`)
        } else if (user[0].status == 'false') {
            await this.userService.query(`UPDATE users
                                                       SET status = 'true'
                                                       where id = '${id.id}'`)
        }

        let users = await this.userService.find()
        return users
    }
}









