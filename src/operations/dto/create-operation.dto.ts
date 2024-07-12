import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateOperationDto {
    @IsString()
    type: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsDate()
    debit_date: Date;
}
