import { Module } from '@nestjs/common';
import { VarientesService } from './varientes.service';
import { VarientesController } from './varientes.controller';
import { Variente } from './entities/variente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Variente])],
  controllers: [VarientesController],
  providers: [VarientesService],
})
export class VarientesModule {}
