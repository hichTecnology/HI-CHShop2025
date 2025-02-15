import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Variente {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  name: string; 

  @Column({nullable: false},) 
  image: string;

  @Column('decimal',{nullable: false,default: 0 }) 
  price: number;

  @Column({nullable: false,default: 0}) 
  stock: number;
  
  @ManyToMany(() => Product, (product) => product.varients) 
  @JoinTable() 
  products: Product[];
}
