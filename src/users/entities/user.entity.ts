
import { SupportMessage } from "@/support-message/entities/support-message.entity";
import { SupportRequest } from "@/support-request/entities/support-request.entity";
import { Exclude } from "class-transformer";
import { request } from "http";
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

  @Column({default: false}) 
  verifidEmail: boolean; 
  
  @Column({nullable: true}) 
  @Exclude()
  password: string;

  @OneToMany(() => Address ,(address) => address.user, { onDelete: 'CASCADE' })
  addresses: Address[];

  @OneToMany(() => Cart ,(cart) => cart.user, { onDelete: 'CASCADE' })
  carts: Cart[];

  @OneToMany(() => SupportRequest , (support_request) => support_request.user , { onDelete: 'CASCADE' } )
  supportRequests : SupportRequest[]

  @OneToMany(() => ProductView ,(product_view) => product_view.user)
  views: ProductView[];

  @OneToMany(() => Favorite ,(favorite) => favorite.user,{ onDelete: 'CASCADE' })
  favorites: Favorite[];

  @OneToMany(() => Review ,(review) => review.user,{ onDelete: 'CASCADE' })
  reviews: Review[];

  @OneToMany(() => Order ,(order) => order.user ,{ onDelete: 'CASCADE' })
  orders: Order[];

  @OneToMany(() => SupportMessage, (msg) => msg.userSender, {  onDelete: 'CASCADE' })
  sentMessages: SupportMessage[];

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date; 


  @UpdateDateColumn({ type: 'timestamptz' }) 
  updatedAt: Date;


}
