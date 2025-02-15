import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Color {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  name: string; 

  @Column() 
  cod: string; 
  
  @ManyToMany(() => Product, (product) => product.colors) 
  @JoinTable() 
  products: Product[];
}
