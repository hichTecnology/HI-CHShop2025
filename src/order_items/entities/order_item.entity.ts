import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid') 
  id: string;  
  
  @ManyToOne(() => Product, (product) => product.orderItems) 
  product: Product; 
  
  @Column('int') 
  quantity: number; 
  
  @Column('decimal') 
  price: number;
}
