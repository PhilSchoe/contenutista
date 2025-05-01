import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ImageController } from "./image/image.controller";
import { ImageService } from "./image/image.service";
import { TestResourceModule } from './test-resource/test-resource.module';
import { TestControllerController } from './test-controller/test-controller.controller';

@Module({
  imports: [TestResourceModule],
  controllers: [AppController, ImageController, TestControllerController],
  providers: [AppService, ImageService],
})
export class AppModule {}
