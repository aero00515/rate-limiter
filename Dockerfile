FROM node:14.15-alpine3.12

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app

COPY package*.json ./

# FIXME: Should be injected by cicd flow
COPY .production.env .production.env

RUN npm ci --only=production

# Bundle app source
COPY dist dist

EXPOSE 3000
CMD [ "npm", "start" ]
