import { Injectable } from '@nestjs/common';
import { CreateTestResourceDto } from './dto/create-test-resource.dto';
import { UpdateTestResourceDto } from './dto/update-test-resource.dto';

@Injectable()
export class TestResourceService {
  create(createTestResourceDto: CreateTestResourceDto) {
    return 'This action adds a new testResource';
  }

  findAll() {
    return `This action returns all testResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testResource`;
  }

  update(id: number, updateTestResourceDto: UpdateTestResourceDto) {
    return `This action updates a #${id} testResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} testResource`;
  }
}
