import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { SupportRequest } from '@/support-request/entities/support-request.entity';
import { User } from '@/users/entities/user.entity';
import { Admin } from '@/admins/entities/admin.entity';

@Entity()
export class SupportMessage {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.sentMessages, { nullable: true })
  userSender: User;

  @ManyToOne(() => Admin, (admin) => admin.sentMessages, { nullable: true })
  adminSender: Admin;

  @ManyToOne(() => SupportRequest, request => request.messages, { onDelete: 'CASCADE' })
  supportRequest: SupportRequest;

  @CreateDateColumn()
  createdAt: Date;

  
}
