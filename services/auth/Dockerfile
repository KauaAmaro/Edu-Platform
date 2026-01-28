# services/auth/Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json .env ./
RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 4001

CMD ["npm", "start"]