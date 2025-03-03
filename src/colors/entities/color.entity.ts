import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Color {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  name: string; 

  @Column() 
  cod: string;
  
  @Column({nullable: false,default: 0 }) 
  stock: number;
  
  @ManyToOne(() => Product, (product) => product.colors) 
  @JoinTable() 
  products: Product;
}
