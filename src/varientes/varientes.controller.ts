import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VarientesService } from './varientes.service';
import { CreateVarienteDto } from './dto/create-variente.dto';
import { UpdateVarienteDto } from './dto/update-variente.dto';

@Controller('varientes')
export class VarientesController {
  constructor(private readonly varientesService: VarientesService) {}

  @Post()
  create(@Body() createVarienteDto: CreateVarienteDto) {
    return this.varientesService.create(createVarienteDto);
  }

  @Get()
  findAll() {
    return this.varientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.varientesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVarienteDto: UpdateVarienteDto) {
    return this.varientesService.update(id, updateVarienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.varientesService.remove(id);
  }
}
