import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Sale {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @OneToOne(() => Product, (product) => product.sale) 
  product: Product; 
  
  @Column('decimal') 
  discountPercentage: number; 
  
  @Column() 
  startDate: Date; 
  
  @Column() 
  endDate: Date;
}
