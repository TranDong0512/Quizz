import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    public questionID: number;
    @Column()
    public  questionName: string;
    @Column()
    public questionPoint: number
}