FROM node:8

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 6000

CMD [ "npm", "start" ]