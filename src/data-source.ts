import {DataSource} from "typeorm";
import "reflect-metadata";
import {User} from "./model/User";
import {Test} from "./model/Test";
import {Category} from "./model/Category";
import {Question} from "./model/Question";
import {UserTest} from "./model/User-Test";


export const AppDataSource = new DataSource({
    type: "mysql",

    host: "localhost",

    port: 3306,

    username: "root",

    password: "12345678",

    database: "quanlythi",

    synchronize: false,

    entities: [User, Test, Category, Question, UserTest]

})
