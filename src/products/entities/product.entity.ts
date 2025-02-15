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
import {  Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  model : string;

  @ManyToOne(() => Category, (category) => category.products) 
  category: Category;

  @ManyToOne(() => Admin, (admin) => admin.products) 
  admin: Admin;

  @OneToMany(() => Review ,(review) => review.product)
  reviews : Review[];

  @OneToMany(() => Favorite ,(favorite) => favorite.product)
  favorites : Favorite[];

  @OneToMany(() => ProductView ,(product_view) => product_view.product)
  views: ProductView[];

  @OneToMany(() => ProductMedia ,(product_media) => product_media.product)
  medias: ProductMedia[];

  @OneToMany(() => Cart ,(cart) => cart.product)
  carts: Cart[];

  @OneToOne(() => Sale)
  @JoinColumn()
  sale: Sale;

  @OneToMany(() => OrderItem ,(order_item) => order_item.product)
  orderItems: OrderItem[];

  @OneToMany(() => Return ,(retur) => retur.product)
  returns: Return[];

  @ManyToMany(() => Tag, (tag) => tag.products) 
  tags: Tag[];
  

  @ManyToMany(() => Color, (color) => color.products) 
  colors: Color[];

  @ManyToMany(() => Size, (size) => size.products) 
  sizes: Size[];

  @ManyToMany(() => Variente, (variente) => variente.products) 
  varients: Variente[];


}
