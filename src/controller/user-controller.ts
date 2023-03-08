import {Request, Response} from "express";
import {UserService} from "../service/user-service";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    register = async (req: Request, res: Response) => {
        let user = req.body
        const schema = Joi.object({
            //bắt buộc là một chuoi
            name: Joi.string().required(),
            //là một chuỗi từ 3 đến 30 ký tự
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            email: Joi.string().email().required(),
        })

        function validateUser(user) {
            return schema.validate(user);
        }

        try {
            const result = validateUser({name: user.userName, password: user.userPassword,email: user.userEmail});
            if (result.error) {
                return res.json({
                    mess: "hãy nhập đúng yêu cầu"
                })
            } else {
                const userFind = await this.userService.findOneUserByUsername(user.userName)
                const userEmail = await this.userService.findOneUserByUserEmail(user.userEmail)
                if (userFind.length !== 0) {
                    return res.json({
                        mess: "Tài khoản đã tồn tại !!",
                        checkRegister: false
                    })
                }
                if (userEmail.length !== 0) {
                    return res.json({
                        mess: "Email đã tồn tại !!",
                        checkRegister: false
                    })
                } else {
                    user.userPassword = await bcrypt.hash(user.userPassword, 10)
                    await this.userService.register(user)
                    return res.status(200).json({
                        mess: 'Đăng ký thành công !!',
                        checkRegister: true
                    })
                }
            }
        }catch (e) {
            console.log(e.message)
        }

    }

    login = async (req: Request, res: Response) => {
        let user = req.body
        let userFind = await this.userService.findOneUserByUsername(user.userName)
        console.log(userFind, 111)
        const userEmail = await this.userService.findOneUserByUserEmail(user.userEmail)
        if (userFind.length == 0) {
            return res.status(200).json({
                massage: 'User is not exist !'
            })
        }
        if (userEmail.length == 0) {
            return res.json({
                mess: "Email is not exist !",
                checkRegister: false
            })
        } else {
            let comparePassword = await bcrypt.compare(user.userPassword, userFind[0].userPassword)
            console.log(comparePassword, 3333)
            if (!comparePassword) {
                return res.json({
                    massage: 'Password is wrong!'
                })
            } else {
                let payload = {
                    id: userFind[0].id,
                    userName: userFind[0].userName
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
        } catch (e) {
            console.log(e.message)
        }

    }

    delete = async (req: Request, res: Response) => {
        try {
            let id = +req.params.id
            let remove = await this.userService.remove(id);
            res.status(200).json(remove)
        } catch (e) {
            console.log(e.message)
        }

    }
    edit = async (req: Request, res: Response) => {
        try {
            let id = +req.params.id
            console.log(id)
            let users = await this.userService.edit(id)
            res.status(200).json({
                users,
                mess: "Thanh cong"
            })
        } catch (e) {
            console.log(e.messages)
        }

    }
}

export default new UserController();