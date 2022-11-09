<p align="center">
    <a href="#">
        <img src="https://i0.wp.com/zenatta.com/wp-content/uploads/2020/08/inventory-256.png?fit=300%2C300&ssl=1" height="100" alt="Inventory Service">
    </a>
</p>

<p align="center">
    <a href="#">
        <img src="https://img.shields.io/badge/npm-v6.3.0-blue" alt="npm@6.3.0">
    </a>
    <img src="https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen" alt="node@>14.0.0">
    <img src="https://img.shields.io/badge/license-Apache2-blue.svg?style=flat" alt="Apache 2">
</p>

# Inventory Service

This Service will handle...

## Features

The Inventory service will provides the following features:

- [x] Dev environment with [docker-compose](https://www.docker.com/)
- [x] Database with [PostgreSql](postgresql.org)
- [x] Dependency injection with [nestjs](https://nestjs.com/)
- [x] Database migration with knexjs [knexjs](https://jestjs.io/)
- [x] REST services using [3 layers pattern](https://www.ecanarys.com/Blogs/ArticleID/76/3-Layered-Architecture)
- [x] Data Access Layer use [typeorm](https://typeorm.io/)
- [x] TDD environment with [Jest](https://jestjs.io/)
- [x] E2E testing [Supertest](https://www.npmjs.com/package/supertest)
- [x] Swagger documentation using [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger)
- [x] Logging using `nest-winston`
- [ ] Event Sourcing using [Temporal](https://temporal.io/)
- [ ] DevOps pipeline with [Github CI](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [ ] Support distributed tracing with [opentelemetry](https://opentelemetry.io/docs/)

## Run the Dev Environment

### Native Application Development

- Install the latest [Node.js](https://nodejs.org/en/download/) 14+ LTS version.
- Install docker/docker-compose on the local machine

```bash
# Up the dependant resources (DB, Search Engine...)
docker-compose up -d

# Install the node dependancies for the first run
npm install

# Run Database migration
npm run migrate:up

# Start the services
npm start
```

> For know more running mode, Please read the package.json

### Access Resource in Local environment

1. Connect with PostgreSQL
   > Recommend [TablePlus](https://tableplus.com/), dbeaver

```
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_pass
POSTGRES_DB=inventory_db
```

2. APIs URL: http://localhost:3000

3. APIs Document (Swagger): http://localhost:3000/docs

## Deploying

Will update later...

## License

This inventory service codebase is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
