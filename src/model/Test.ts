import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    public readonly testId: number;
    @Column({type: "varchar"})
    public testName: string;
    @Column({type:"int"})
    public idNameCreate: number;
    @Column({type:"int"})
    public idCategory: number;
}