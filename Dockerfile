FROM node:20-alpine3.18

WORKDIR /dazum

RUN bun install
COPY . /dazum

EXPOSE 8080
CMD ['bun', 'start']
