import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    public testId: number;
    @Column()
    public testName: string;
    @Column()
    public idNameCreate: number;
    @Column()
    public idCategory: number;
    @Column()
    public name: string;
}