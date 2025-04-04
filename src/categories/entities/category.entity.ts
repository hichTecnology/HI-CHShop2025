import { Model } from "src/model/entities/model.entity";
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
  parentId: string;

  @OneToMany(() => Model, (model) => model.category,{cascade: true})
  models: Model[]; // Relazione con i modelli

  @ManyToOne(() => Category, (category) => category.children, { nullable: true,onDelete: 'CASCADE' })
  parent: Category; // La categoria padre (es. Smartphone)

  @OneToMany(() => Category, (category) => category.parent,{cascade: true})
  children: Category[]; // Le sottocategorie (es. iPhone, Accessori)

  @ManyToMany(() => Product, (product) => product.category) 
  @JoinTable()
  products: Product[];
}
