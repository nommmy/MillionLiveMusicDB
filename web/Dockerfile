FROM node:24-alpine AS base

WORKDIR /workspace
RUN apk add --update python3 make g++ && apk add bash

CMD [ "npm", "run", "dev" ]