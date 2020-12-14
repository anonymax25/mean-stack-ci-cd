FROM node:10.13

ENV NODE_VERSION 10.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 4200
ENV MONGO mongodb+srv://dev-moveup:dev-moveup@cluster0.debdw.mongodb.net/todolist?authSource=admin&replicaSet=atlas-5p4by3-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
CMD [ "npm", "start" ]
