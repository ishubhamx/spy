FROM node 

RUN apt-get update && apt-get install -y default-jdk

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]