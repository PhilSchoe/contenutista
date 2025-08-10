import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { MinioService } from "../objectstore/minio.service";
import { CreatePresignedUrlDto } from "./create-presigned-url.dto";

@Controller("files")
export class FilesController {
  constructor(private readonly minioService: MinioService) {}

  @Post("presigned-url")
  async createPresignedUrl(
    @Body() createPresignedUrlDto: CreatePresignedUrlDto,
  ) {
    const { objectName, bucketName } = createPresignedUrlDto;
    if (!objectName || objectName.trim() === "") {
      throw new BadRequestException("Object name is required");
    }

    return this.minioService.getPutObjectUrl(objectName, bucketName);
  }
}
