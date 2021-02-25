FROM node:12-alpine

COPY '/packages/web' './packages/web'
COPY '/packages/eslint-config' './packages/eslint-config'

COPY ["package.json", "yarn.lock", "./"] 

WORKDIR '/packages/web'

RUN yarn install && yarn build

RUN yarn global add serve

ENTRYPOINT [ "serve", "-l", "3000", "-s", "build" ]
