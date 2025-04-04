import { Product } from "src/products/entities/product.entity";
import { Column, Entity,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Sale {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @OneToOne(() => Product, (product) => product.sale,{ onDelete: 'SET NULL' }) 
  product: Product; 
  
  @Column('decimal') 
  discountPercentage: number; 
  
  @Column() 
  startDate: Date; 
  
  @Column() 
  endDate: Date;
}
