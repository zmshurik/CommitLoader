# CommitLoader

Test assignment for sendit.ru

## Requirements

- Mac / Linux
- Docker
- Docker Compose

## Install

```bash
 git clone
 cd CommitLoader
 docker-compose build
 docker-compose run --rm web bash -c "bundle install && yarn"
 docker-compose run --rm web bash -c "rails db:create db:migrate"
```

## Run

```bash
docker-compose up
```

- Open <http://localhost:3000>

## Test

```bash
docker-compose run --rm web bash -c "rspec"
```
