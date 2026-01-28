# services/auth/Dockerfile (e similares)
FROM node:18-slim

WORKDIR /app

COPY package*.json .env ./
COPY prisma ./prisma/ 
RUN npm install --production
RUN npx prisma generate

COPY . .

#RUN npx prisma generate

EXPOSE 4003

CMD ["npm", "start"]