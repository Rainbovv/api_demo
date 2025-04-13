## Name
Api Demo App.

## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript demo application

## Project setup
Before installing the app, the config.yaml file with environment variables should be added.

Config.yaml required structure:

```bash
pg:
  user: 
  host: 
  database: 
  password: 
jwt:
  secret: 
      
```

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```