
import { Address } from "src/addresses/entities/address.entity";
import { Cart } from "src/carts/entities/cart.entity";
import { Category } from "src/categories/entities/category.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Order } from "src/orders/entities/order.entity";
import { ProductView } from "src/product_views/entities/product_view.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string; 
  
  @Column() 
  username: string; 
  
  @Column() 
  email: string; 
  
  @Column() 
  password: string;

  @OneToMany(() => Address ,(address) => address.user)
  addresses: Address[];

  @OneToMany(() => Cart ,(cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => ProductView ,(product_view) => product_view.user)
  views: ProductView[];

  @OneToMany(() => Favorite ,(favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Review ,(review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order ,(order) => order.user)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date; 


  @UpdateDateColumn({ type: 'timestamptz' }) 
  updatedAt: Date;


}
