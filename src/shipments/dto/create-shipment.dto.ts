import { IsNumber, IsString } from "class-validator";

export class CreateShipmentDto {
    @IsString()
    orderId: string; 

    @IsString()
    addressId: string; 

    @IsString()
    trackingNumber: string;
    
    @IsString()
    carrier: string;
    
    @IsString()
    status: string; 
    
    @IsNumber()
    price: number; 
}
