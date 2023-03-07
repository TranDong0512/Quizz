import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    public readonly questionID: number;
    @Column({type: "varchar"})
    public questionName: string;
    @Column({type: "int"})
    public questionPoint: number
}