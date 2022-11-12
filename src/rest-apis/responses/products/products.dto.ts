import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class ProductIdDTO {
  @ApiProperty()
  id: string;
}

export class ProductDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  shortCode: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  images: string[];

  @ApiResponseProperty({
    example: 'yyyy-MM-ddThh:mm:ss.123Z',
  })
  createdAt: string;

  @ApiResponseProperty({
    example: 'yyyy-MM-ddThh:mm:ss.123Z',
  })
  updatedAt: string;

  @ApiResponseProperty({
    example: 'yyyy-MM-ddThh:mm:ss.123Z',
  })
  deletedAt: string;

  @ApiResponseProperty({
    example: 'yyyy-MM-ddThh:mm:ss.123Z',
  })
  restoredAt: string;
}
