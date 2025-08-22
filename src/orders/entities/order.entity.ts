import { Cart } from "@/carts/entities/cart.entity";
import { IsString } from "class-validator";
import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Return } from "src/returns/entities/return.entity";
import { Shipment } from "src/shipments/entities/shipment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column({type:'decimal',nullable:false}  ) 
  totalAmount: number; 
  
  @Column() 
  status: string; 

  @Column() 
  userId: string;
  
  
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
  
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' }) 
  user: User;
  
  @OneToOne(() => Payment, (payment) => payment.order) 
  payment: Payment;

  @OneToOne(() => Shipment, (shipment) => shipment.order , { onDelete: 'CASCADE' }) 
  shipment: Shipment;

  @OneToOne(() => Return, (retur) => retur.order) 
  return: Return;
  
  @OneToMany (() => Cart ,(cart) => cart.order)
  carts: Cart[]
}
