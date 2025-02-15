import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductView {
  
  @PrimaryGeneratedColumn('uuid') 
  id: string;  

  @ManyToOne(() => User, (user) => user.views) 
  user: User;
  
  @ManyToOne(() => Product, (product) => product.views) 
  product: Product; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  viewedAt: Date
}
