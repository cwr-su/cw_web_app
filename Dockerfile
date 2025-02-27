# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN rm -rf package-lock.json node_modules
RUN npm install --legacy-peer-deps --no-audit --no-fund
RUN npm shrinkwrap

# Копируем весь код в контейнер
COPY . .

# Строим проект Next.js
RUN npm run build

# Указываем порт, на котором приложение будет работать
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
