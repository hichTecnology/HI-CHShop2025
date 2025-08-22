
import { Shipment } from "@/shipments/entities/shipment.entity";
import { User } from "@/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column({nullable : true}) 
  userId: string;
  
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' }) 
  user: User; 

  @OneToOne(() => Shipment, (shipment) => shipment.address, { onDelete: 'CASCADE' })
  shipment: Shipment;
  
  @Column() 
  indirizzo1: string; 
  
  @Column({ nullable: true }) 
  indirizzo2: string; 
  
  @Column() 
  comune: string; 
  
  @Column() 
  stato: string; 
  
  @Column() 
  CAP: number; 

  @Column() 
  civico: string; 

  @Column({ type: 'bigint', nullable: true }) 
  telefono: string; 
  
  @Column() 
  provincia: string;

  @Column() 
  regione: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  updatedAt: Date;
}
