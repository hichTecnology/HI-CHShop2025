import { Model } from "src/model/entities/model.entity";
import { Admin } from "src/admins/entities/admin.entity";
import { Cart } from "src/carts/entities/cart.entity";
import { Category } from "src/categories/entities/category.entity";
import { Color } from "src/colors/entities/color.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { OrderItem } from "src/order_items/entities/order_item.entity";
import { ProductMedia } from "src/product_medias/entities/product_media.entity";
import { ProductView } from "src/product_views/entities/product_view.entity";
import { Return } from "src/returns/entities/return.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Size } from "src/sizes/entities/size.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { Variente } from "src/varientes/entities/variente.entity";
import {  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column() 
  name: string; 

  @Column() 
  image: string; 

  @Column() 
  description: string; 

  @Column('decimal') 
  price: number; 

  @Column('int') 
  stock: number;

  @ManyToMany(() => Product)
  @JoinTable() // <<< CREA AUTOMATICAMENTE LA TABELLA INTERMEDIA
  prodottiCorrelati: Product[];

  @ManyToMany(() => Category, (category) => category.products,{ onDelete: 'CASCADE' }) 
  category: Category[];

  @ManyToOne(() => Admin, (admin) => admin.products,{ onDelete: 'CASCADE' }) 
  admin: Admin;

  @OneToMany(() => Review ,(review) => review.product,{ cascade: true })
  reviews : Review[];

  @OneToMany(() => Favorite ,(favorite) => favorite.product,{ cascade: true })
  favorites : Favorite[];

  @OneToMany(() => ProductView ,(product_view) => product_view.product,{ cascade: true })
  views: ProductView[];

  @OneToMany(() => ProductMedia ,(product_media) => product_media.product,{ cascade: true })
  medias: ProductMedia[];

  @OneToMany(() => Cart ,(cart) => cart.product,{ cascade: true })
  carts: Cart[];

  @OneToOne(() => Sale, (sale) => sale.product)
  @JoinColumn()
  sale: Sale;

  @ManyToMany(() => Model, (model) => model.products,{ cascade : true })
  @JoinTable() 
  models: Model[]; // Relazione con i modelli

  @OneToMany(() => OrderItem ,(order_item) => order_item.product,{ cascade: true })
  orderItems: OrderItem[];

  @OneToMany(() => Return ,(retur) => retur.product,{ cascade: true })
  returns: Return[];

  @ManyToMany(() => Tag, (tag) => tag.products,{ onDelete: 'CASCADE' }) 
  tags: Tag[];
  

  @OneToMany(() => Color, (color) => color.products,{ cascade: true }) 
  colors: Color[];

  @OneToMany(() => Size, (size) => size.products,{ cascade: true }) 
  sizes: Size[];

  @ManyToMany(() => Variente, (variente) => variente.products,{ onDelete: 'CASCADE' }) 
  varients: Variente[];


}
