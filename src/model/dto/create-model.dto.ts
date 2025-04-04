import { IsString, IsUUID } from "class-validator";

export class CreateModelDto {

  @IsString()
  name: string; // Nome del modello (obbligatorio)

  
  @IsString()
  categoryId: string;// ID della categoria associata al modello (obbligatorio)
}
