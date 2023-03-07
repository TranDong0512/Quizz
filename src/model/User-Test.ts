import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserTest {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public U_id: number;
    @Column()
    public T_id: number;
    @Column()
    public total: number;
}