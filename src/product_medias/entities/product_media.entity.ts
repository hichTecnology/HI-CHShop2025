import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductMedia {

  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @ManyToOne(() => Product, (product) => product.medias,{ onDelete: 'CASCADE' }) 
  product: Product; 
  
  @Column() 
  mediaType: string; // "image" or "video" 
  
  @Column() 
  url: string; 
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date;
}
