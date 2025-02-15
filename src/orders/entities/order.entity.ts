import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Return } from "src/returns/entities/return.entity";
import { Shipment } from "src/shipments/entities/shipment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column('decimal') 
  totalAmount: number; 
  
  @Column() 
  status: string; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
  
  @ManyToOne(() => User, (user) => user.orders) 
  user: User;
  
  @OneToMany(() => Payment, (payment) => payment.order) 
  payments: Payment[];

  @OneToMany(() => Shipment, (shipment) => shipment.order) 
  shipments: Shipment[];

  @OneToMany(() => Return, (retur) => retur.order) 
  returns: Return[];
  
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order) 
  items: OrderItem[];
}
