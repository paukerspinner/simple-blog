# my-blog

## Pre-installation Requirements
- Docker, Docker Compose
- Node 16

## Installation

Database

```sh
docker compose up postgres
```

Server

```sh
cd server
cp .env.dev .env
npm install
npm run start:dev
```

App

```sh
cd app
cp .env.dev .env
npm install
npm start
```