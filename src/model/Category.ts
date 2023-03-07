import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    public categoryId: number;
    @Column()
    public nameCategory: string;
}