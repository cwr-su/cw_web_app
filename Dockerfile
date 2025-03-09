FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json && npm cache clean --force

RUN npm install --omit=dev --no-audit --no-fund

RUN apt-get update && apt-get install -y openssl

COPY . .

RUN rm -rf .next

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
