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

  @OneToMany(() => Product, (product) => product.admin) 
  products: Product[];

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date; 

  @UpdateDateColumn({ type: 'timestamptz' }) 
  updatedAt: Date;
}
