import { AppDataSource } from "../data-source";
import { User } from "../model/user"

export class UserService {
    private userService: any;

    constructor() {
        this.userService = AppDataSource.getRepository(User)
    }
    findAll = async () => {
        return await this.userService.find()

    };
    findOneUserByUsername = async (username) => {
        return await this.userService.query(`select *
                                                  from user
                                                  where userName = '${username}'`)

    };
    register = async (data) => {
        return await this.userService.save(data)

    };
    remove = async (id) => {
        return await this.userService.delete(id)

    };
    edit = async (id) => {
        let user = await this.userService.query(`select * from user where userId = '${id.userId}'`)

        if (user[0].status == 0) {
            await this.userService.query(`UPDATE user
                                                       SET role = 1
                                                       where userId = '${id.userId}'`)
        } else if (user[0].status == 1) {
            await this.userService.query(`UPDATE users
                                                       SET role = 0
                                                       where userId = '${id.userId}'`)
        }

        return await this.userService.find()

    }
}