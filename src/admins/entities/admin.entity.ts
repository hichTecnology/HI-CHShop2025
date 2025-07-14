import { SupportMessage } from "@/support-message/entities/support-message.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Admin {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  username: string; 
  
  @Column() 
  email: string; 
  
  @Column() 
  password: string;

  @Column({nullable: false,default: true }) 
  check: boolean;

  @OneToMany(() => Product, (product) => product.admin) 
  products: Product[];

  @OneToMany(() => SupportMessage, (msg) => msg.adminSender)
  sentMessages: SupportMessage[];

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date; 

  @UpdateDateColumn({ type: 'timestamptz' }) 
  updatedAt: Date;
}
