import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coupon {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  code: string; 
  
  @Column('decimal') 
  discountAmount: number; 
  
  @Column() 
  startDate: Date; 
  
  @Column() 
  endDate: Date; 
  
  @Column('int') 
  usageLimit: number;
}
