![CI](https://github.com/aero00515/rate-limiter/workflows/ci/badge.svg)

# Rate Limiter
A homework trying to have rate limiter implemented with Node.js.

## How to start
In current version, I use redis as limit counter. 
You can easily start this application by using docker compose, this will create 2 container: 1. rate-limiter api 2. redis.   
For those who want to start purely (e.g. docker hater). You'll need to start your own redis server at local.

## Prerequirements
1. [Docker 20.10.0, build 7287ab3](https://docs.docker.com/engine/install/)
2. [npm v6.14.10](https://www.npmjs.com/get-npm)

### Easy Start
`npm run start-from-zero`   
then you can go checkout `.http` file at project root.
### Standlone
Start Rate Limiter Service independent.   
Notice: You need to start redis locally.

#### Development
`npm install`   
`npm run dev`   
then you can go checkout `.http` file at project root.
