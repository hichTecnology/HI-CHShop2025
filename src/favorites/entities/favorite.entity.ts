import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column({nullable: true})
  productId : string

  @Column({nullable: true})
  userId : string
  
  @ManyToOne(() => Product, (product) => product.favorites) 
  product: Product; 

  @ManyToOne(() => User, (user) => user.favorites) 
  user: User;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date;
}
