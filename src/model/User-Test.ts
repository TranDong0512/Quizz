import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserTest {
    @PrimaryGeneratedColumn()
    public readonly id: number;
    @Column({type: "int"})
    public U_id: number;
    @Column({type: "int"})
    public T_id: number;
    @Column({type: "int"})
    public total: number;
}