import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Size {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  name: string; 
  
  @ManyToMany(() => Product, (product) => product.sizes) 
  @JoinTable() 
  products: Product[];
}
