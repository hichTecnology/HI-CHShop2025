import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @OneToOne(() => Order, (order) => order.payment) 
  order: Order; 
  
  @Column('decimal') 
  amount: number; 
  
  @Column() 
  method: string; // "Credit Card", "PayPal", etc. 
  
  @Column() 
  status: string; // "Completed", "Failed", etc. 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date;
}
