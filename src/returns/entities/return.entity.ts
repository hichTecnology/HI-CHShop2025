import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Return {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @ManyToOne(() => Order, (order) => order.returns) 
  order: Order; 
  
  @ManyToOne(() => Product, (product) => product.returns) 
  product: Product; 
  
  @Column('int') 
  quantity: number; 
  
  @Column() 
  reason: string; 
  
  @Column() 
  status: string; // "Pending", "Approved", "Rejected" 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  requestedAt: Date; 
  
  @Column({ type: 'timestamp', nullable: true }) 
  processedAt: Date;
}
