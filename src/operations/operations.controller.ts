import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('operations')
export class OperationsController {
    constructor(private readonly operationsService: OperationsService) { }

    @Post()
    async create(@Body() createOperationDto: CreateOperationDto) {
        try {
            return await this.operationsService.create(createOperationDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Failed to create operation');
        }
    }

    @Get()
    async findAll() {
        return this.operationsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.operationsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateOperationDto: CreateOperationDto) {
        try {
            return await this.operationsService.update(id, updateOperationDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Failed to update operation');
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.operationsService.remove(id);
    }
}
