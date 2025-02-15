import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @ManyToOne(() => User, (user) => user.addresses) 
  user: User; 
  
  @Column() 
  addressLine1: string; 
  
  @Column({ nullable: true }) 
  addressLine2: string; 
  
  @Column() 
  city: string; 
  
  @Column() 
  state: string; 
  
  @Column() 
  postalCode: number; 
  
  @Column() 
  country: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  updatedAt: Date;
}
