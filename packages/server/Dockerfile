FROM node:12-alpine

COPY '/packages/server' './packages/server'
COPY '/packages/eslint-config' './packages/eslint-config'

COPY ["package.json", "yarn.lock", "ormconfig.js" ,".env", "./"] 

WORKDIR '/packages/server'

RUN yarn install

ENTRYPOINT [ "yarn", "start" ]
