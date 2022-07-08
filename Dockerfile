ARG NODE_VERSION
ARG HTTP_PROXY
FROM node:${NODE_VERSION} as build

ENV http_proxy ${HTTP_PROXY}
ENV https_proxy ${HTTP_PROXY}
ENV no_proxy 172.28.*
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY ./docker/nginx/nginx.template /etc/nginx/conf.d/
COPY . /app
COPY --from=build /app/build /app/build