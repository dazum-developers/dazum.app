FROM node:20-alpine3.18

WORKDIR /planner

COPY app/ /planner/app
COPY components/ /planner/components
COPY dtos/ /planner/dtos
COPY lib/ /planner/lib
COPY prisma/ /planner/prisma
COPY public/ /planner/public
COPY translations/ /planner/translations
COPY package.json /planner/

RUN yarn set version stable
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "start"]
