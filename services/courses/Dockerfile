# services/auth/Dockerfile
FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /va

COPY package*.json .env ./
RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 4002

CMD ["npm", "start"]