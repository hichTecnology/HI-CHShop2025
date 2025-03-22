import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Size {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  name: string; 

  @Column('decimal',{nullable: false,default: 0 }) 
  price: number;

  @Column({nullable: false,default: 0 }) 
  stock: number;
  
  @ManyToOne(() => Product, (product) => product.sizes,{ onDelete: 'CASCADE' }) 
  @JoinTable() 
  products: Product;
}
