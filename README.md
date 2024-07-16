
## Documentation

Documentation on Surveys.postman_collection.json file

# Run docker with existing db (without docker-compose.yml)

docker build -t survey-service .

docker run -d --name survey-service \
  -e DB_HOST=<your_db_host> \
  -e DB_PORT=<your_db_port> \
  -e DB_USERNAME=<your_db_user> \
  -e DB_PASSWORD=<your_db_password> \
  -e DB_DATABASE=<your_db_name> \
  -e CONFLICT_SERVICE_URL=<your_conflict_service_url> \
  -p 3000:3000 \
  survey-service



# Run the Docker container with db

touch .env

Example:
  DB_HOST=<your_db_host>
  DB_PORT=<your_db_port>
  DB_USERNAME=<your_db_user>
  DB_PASSWORD=<your_db_password>
  DB_DATABASE=<your_db_name>
  CONFLICT_SERVICE_URL=<your_conflict_service_url>

docker-compose build
docker-compose up

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
