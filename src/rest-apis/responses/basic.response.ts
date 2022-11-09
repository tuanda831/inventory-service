import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';

export interface BadRequestError {
  arg: string;
  reason: string;
}

export class MetaDTO {
  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;
}

export class BaseResponse<D, M> {
  private res: Response;

  data: D;

  meta: M;

  @ApiProperty()
  message: string;

  constructor(res: Response) {
    this.res = res;
  }

  success(data: D, meta: M) {
    this.res.status(200).send({ data, meta });
  }

  created(resourceName: string, data: D) {
    this.res.status(201).send({
      message: `"${resourceName}" is Created!`,
      data,
    });
  }

  unAuthorise(message: string) {
    this.res.status(401).send({ message });
  }

  badRequest(data: BadRequestError[], message = 'Bad Request!') {
    this.res.status(400).send({
      message,
      data,
    });
  }

  badGateway(error: Error, message = 'Bad Gateway!') {
    this.res.status(502).send({
      message,
      data: error.message,
    });
  }

  forbidden(message = 'Permission Deny!') {
    this.res.status(403).send({ message });
  }

  notFound(resourceName: string) {
    this.res.status(404).send({
      message: `"${resourceName}" Not Found!`,
    });
  }

  noContent(message = 'No Content') {
    this.res.status(204).send({ message });
  }

  serverError(error: Error, message = 'Server Error!') {
    this.res.status(500).send({
      message,
      data: error,
    });
  }
}
