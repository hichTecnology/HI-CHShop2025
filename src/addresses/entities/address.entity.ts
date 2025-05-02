
import { User } from "@/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column({nullable : true}) 
  userId: string;
  
  @ManyToOne(() => User, (user) => user.addresses) 
  user: User; 
  
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

  @Column() 
  telefono: number; 
  
  @Column() 
  provincia: string;

  @Column() 
  regione: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  updatedAt: Date;
}
