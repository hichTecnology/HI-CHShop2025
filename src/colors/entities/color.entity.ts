import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Color {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  name: string; 

  @Column('decimal',{nullable: false,default: 0 }) 
  price: number;

  @Column() 
  cod: string;
  
  @Column({nullable: false,default: 0 }) 
  stock: number;
  
  @ManyToOne(() => Product, (product) => product.colors,{ onDelete: 'CASCADE' }) 
  @JoinTable() 
  products: Product;
}
