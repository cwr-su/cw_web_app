FROM node:20

WORKDIR /app

COPY package*.json ./

RUN rm -rf package-lock.json node_modules

RUN npm install --legacy-peer-deps --no-audit --no-fund
RUN npm shrinkwrap

COPY . .

RUN rm -rf .next

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
