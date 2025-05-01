import { PartialType } from '@nestjs/mapped-types';
import { CreateTestResourceDto } from './create-test-resource.dto';

export class UpdateTestResourceDto extends PartialType(CreateTestResourceDto) {}
