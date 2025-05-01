import { Module } from '@nestjs/common';
import { TestResourceService } from './test-resource.service';
import { TestResourceController } from './test-resource.controller';

@Module({
  controllers: [TestResourceController],
  providers: [TestResourceService],
})
export class TestResourceModule {}
