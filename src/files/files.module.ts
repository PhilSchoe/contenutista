import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { MinioService } from "src/objectstore/minio.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [FilesController],
  providers: [MinioService, ConfigService],
})
export class FilesModule {}
