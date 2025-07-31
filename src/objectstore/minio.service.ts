import { Injectable, OnModuleInit } from "@nestjs/common";
import * as Minio from "minio";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MinioService implements OnModuleInit {
  private client: Minio.Client;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.initMinioClient();

    try {
      await this.client.bucketExists(
        this.configService.getOrThrow("MINIO_DEFAULT_BUCKET"),
      );
    } catch (error) {
      console.error("Error checking bucket existence:", error);
    }
  }

  private initMinioClient() {
    this.client = new Minio.Client({
      endPoint: this.configService.getOrThrow("MINIO_ENDPOINT"),
      port: this.configService.getOrThrow("MINIO_PORT"),
      useSSL: this.configService.getOrThrow("MINIO_USE_SSL") === "true",
      accessKey: this.configService.getOrThrow("MINIO_ACCESS_KEY"),
      secretKey: this.configService.getOrThrow("MINIO_SECRET_KEY"),
    });
  }

  private async createBucketIfNotExists(bucketName: string) {
    const exists = await this.client.bucketExists(bucketName);
    if (exists) {
      return Promise.resolve();
    }

    await this.client.makeBucket(bucketName, "eu-central-1");
  }

  async getPutObjectUrl(
    objectName: string,
    bucketName: string = this.configService.getOrThrow("MINIO_DEFAULT_BUCKET"),
  ): Promise<string> {
    return this.client.presignedPutObject(bucketName, objectName);
  }
}
