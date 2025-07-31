import { Body, Controller, Post } from "@nestjs/common";
import { MinioService } from "src/objectstore/minio.service";
import { CreatePresignedUrlDto } from "./create-presigned-url.dto";

@Controller("files")
export class FilesController {
  constructor(private readonly minioService: MinioService) {}

  @Post("presigned-url")
  async createPresignedUrl(
    @Body() createPresignedUrlDto: CreatePresignedUrlDto,
  ) {
    const { objectName, bucketName } = createPresignedUrlDto;
    return this.minioService.getPutObjectUrl(objectName, bucketName);
  }
}
