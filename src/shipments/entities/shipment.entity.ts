
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @OneToOne(() => Order, (order) => order.shipment) 
  order: Order; 
  
  @Column() 
  trackingNumber: string; 
  
  @Column() 
  carrier: string; // "DHL", "UPS", etc. 
  
  @Column() 
  status: string; // "In Transit", "Delivered", etc. 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  shippedAt: Date; 
  
  @Column() 
  expectedDelivery: Date;
}
