
import { Address } from "@/addresses/entities/address.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column() 
  orderId: string;

  @Column({nullable:true}) 
  addressId: string;
  
  @OneToOne(() => Order, (order) => order.shipment) 
  @JoinColumn()
  order: Order; 

  @OneToOne(() => Address, (address) => address.shipment)
  @JoinColumn()
  address: Address;
  
  @Column() 
  trackingNumber: string; 
  
  @Column() 
  carrier: string; // "DHL", "UPS", etc. 
  
  @Column() 
  status: string; // "In Transit", "Delivered", etc. 



  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  shippedAt: Date; 
  
  
}
