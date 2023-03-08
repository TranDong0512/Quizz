import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public userId: number;
    @Column()
    public userName: string;
    @Column()
    public userEmail: string;
    @Column()
    public userPassword: string;
    @Column({ default: 1 })
    public role: boolean;
}