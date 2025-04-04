import { Category } from "@/categories/entities/category.entity";
import { Product } from "@/products/entities/product.entity";
import { Column, Entity, JoinColumn,  ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model {
  @PrimaryGeneratedColumn('uuid') // UUID per identificatori univoci
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.models, { nullable: true ,onDelete: 'CASCADE'})
  @JoinColumn({ name: 'categoryId' }) // Indica la colonna di join
  category: Category; // Relazione con la categoria

  @OneToOne(() => Product, (product) => product.model, { nullable: true ,onDelete: 'CASCADE'})
  product: Product; // Relazione con il prodotto
}
