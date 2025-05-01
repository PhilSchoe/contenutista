import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestResourceService } from './test-resource.service';
import { CreateTestResourceDto } from './dto/create-test-resource.dto';
import { UpdateTestResourceDto } from './dto/update-test-resource.dto';

@Controller('test-resource')
export class TestResourceController {
  constructor(private readonly testResourceService: TestResourceService) {}

  @Post()
  create(@Body() createTestResourceDto: CreateTestResourceDto) {
    return this.testResourceService.create(createTestResourceDto);
  }

  @Get()
  findAll() {
    return this.testResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestResourceDto: UpdateTestResourceDto) {
    return this.testResourceService.update(+id, updateTestResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testResourceService.remove(+id);
  }
}
