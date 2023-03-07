import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public readonly userId: number;
    @Column({type: "varchar"})
    public userName: string;
    @Column({type:"varchar"})
    public userEmail:string;
    @Column({type:"varchar"})
    public userPassword: string;
    @Column({type:"boolean",default: 0})
    public role:boolean;
}