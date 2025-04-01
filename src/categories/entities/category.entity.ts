import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid') 
  id: string; 

  @Column() 
  name: string; 

  @Column({nullable: false,default: 0 }) 
  grado: number; 

  @Column({ nullable: true })
  parentId: number; 

  @ManyToOne(() => Category, (category) => category.children, { nullable: true })
  parent: Category; // La categoria padre (es. Smartphone)

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[]; // Le sottocategorie (es. iPhone, Accessori)

  @ManyToMany(() => Product, (product) => product.category) 
  @JoinTable()
  products: Product[];
}
