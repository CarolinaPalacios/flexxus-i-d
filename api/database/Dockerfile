FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma db push

RUN npx prisma migrate

RUN npm run build

EXPOSE 3003

CMD [ "npm", "run", "start" ]