import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { SupportMessage } from '@/support-message/entities/support-message.entity';


@Entity()
export class SupportRequest {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({ default: 'open' })
  status: string; // open, closed, etc.

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.supportRequests)
  user: User;

  @OneToMany(() => SupportMessage, message => message.supportRequest)
  messages: SupportMessage[];
}
