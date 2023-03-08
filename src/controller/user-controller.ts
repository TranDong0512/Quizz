import {Request, Response} from "express";
import {UserService} from "../service/user-service";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    register = async (req: Request, res: Response) => {
        let user = req.body
        const userFind = await this.userService.findOneUserByUsername(user.userName)
        if(userFind.length !== 0) {
            return res.json({
                mess: "Tài khoản đã tồn tại !!",
                checkRegister: false
            })
        }else{
            user.userPassword = await bcrypt.hash(user.userPassword, 10)
            await this.userService.register(user)
            return res.status(200).json({
                mess: 'Đăng ký thành công !!',
                checkRegister: true
            })  
        }
    }

    login = async (req: Request, res: Response) => {
        let user = req.body
        let userFind = await this.userService.findOneUserByUsername(user.userName)
        if (userFind.length == 0) {
            return res.status(200).json({
                message: 'User is not exist !'
            })
        } else {
            let comparePassword = await bcrypt.compare(user.userPassword, userFind[0].userPassword)
            if (!comparePassword) {
                return res.json({
                    message: 'Password is wrong!'
                })
            } else {
                let payload = {
                    id: userFind[0].id,
                    username: userFind[0].userName
                }
                let secret = 'quan'
                let token = jwt.sign(payload, secret, {
                    expiresIn: 36000
                });
                return res.json({
                    token: token,
                    user: userFind[0]
                })
            }
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let user = await this.userService.findAll();
            res.status(200).json(user)
        }catch (e){
            console.log(e.message)
        }

    }

    delete = async (req: Request, res: Response) => {
        let id = +req.params.id
        let remove = await this.userService.remove(id);
        res.status(200).json(remove)
    }
    edit = async (req: Request, res: Response) => {
        let id = +req.params.id
        let users = await this.userService.edit({id: id})
        res.status(200).json({
            users,
            mess: "Thanh cong"
        })
    }
}

export default new UserController();