import { PartialType } from '@nestjs/mapped-types';
import { CreateVarienteDto } from './create-variente.dto';

export class UpdateVarienteDto extends PartialType(CreateVarienteDto) {}
