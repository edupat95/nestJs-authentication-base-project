import { Delete } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true, nullable: false })
    username: string;

    @Column({ length: 100, nullable: false, select: false })
    password: string;
    
    @Column({ length: 100, unique: true, nullable: false })
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: "user", nullable: false })
    role: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deletedAt: Date;


}
