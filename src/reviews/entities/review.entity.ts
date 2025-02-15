import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Review {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  rating: number; 
  
  @Column() 
  comment: string; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 

  @ManyToOne(() => Product, (product) => product.reviews) 
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews) 
  user: User;
}
