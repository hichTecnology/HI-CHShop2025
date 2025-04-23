import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {

  
  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column({nullable : true}) 
  userId: string;
  
  @Column({nullable : true}) 
  productId: string;
  
  @ManyToOne(() => Product, (product) => product.carts) 
  product: Product; 

  @ManyToOne(() => User, (user) => user.carts) 
  user: User;
  
  @Column('int') 
  quantity: number; 

  @Column('decimal',{default:0,nullable : true}) 
  totale: number; 

  @Column({nullable : true}) 
  size: string; 

  @Column({nullable : true}) 
  color: string; 

  @Column({nullable : true}) 
  variente: string; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  updatedAt: Date;
}
