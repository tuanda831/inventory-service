import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseResponse } from '../rest-apis/responses/basic.response';

export const ApiOkResponseArray = <
  DataDTO extends Type<unknown>,
  MetaDTO extends Type<unknown>,
>(
  dataDto: DataDTO,
  metaDto: MetaDTO,
) =>
  applyDecorators(
    ApiExtraModels(BaseResponse, dataDto, metaDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
              meta: {
                type: 'object',
                $ref: getSchemaPath(metaDto),
              },
            },
          },
        ],
      },
    }),
  );

export const ApiOkResponseObject = <
  DataDTO extends Type<unknown>,
  MetaDTO extends Type<unknown>,
>(
  dataDto: DataDTO,
  metaDto: MetaDTO,
) =>
  applyDecorators(
    ApiExtraModels(BaseResponse, dataDto, metaDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(dataDto),
              },
              meta: {
                type: 'object',
                $ref: getSchemaPath(metaDto),
              },
            },
          },
        ],
      },
    }),
  );
