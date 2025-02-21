# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps > install.log 2>&1

# Копируем весь код в контейнер
COPY . .

# Строим проект Next.js
RUN npm run build

# Указываем порт, на котором приложение будет работать
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
