import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from './colors/colors.module';
import { TagsModule } from './tags/tags.module';
import { VarientesModule } from './varientes/varientes.module';
import { SizesModule } from './sizes/sizes.module';
import { SalesModule } from './sales/sales.module';
import { CouponsModule } from './coupons/coupons.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AdminsModule } from './admins/admins.module';
import { PaymentsModule } from './payments/payments.module';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReturnsModule } from './returns/returns.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductViewsModule } from './product_views/product_views.module';
import { ProductMediasModule } from './product_medias/product_medias.module';
import { CartsModule } from './carts/carts.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthUserModule } from './auth-user/auth-user.module';
import { ModelModule } from './model/model.module';
import { SupportRequestModule } from './support-request/support-request.module';
import { SupportMessageModule } from './support-message/support-message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port:parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities : true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UsersModule,
    ColorsModule,
    TagsModule,
    VarientesModule,
    SizesModule,
    SalesModule,
    CouponsModule,
    ShipmentsModule,
    FavoritesModule,
    AdminsModule,
    PaymentsModule,
    AddressesModule,
    OrdersModule,
    CategoriesModule,
    ProductsModule,
    ReturnsModule,
    ReviewsModule,
    ProductViewsModule,
    ProductMediasModule,
    CartsModule,
    OrderItemsModule,
    AuthModule,
    AuthUserModule,
    ModelModule,
    SupportRequestModule,
    SupportMessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
