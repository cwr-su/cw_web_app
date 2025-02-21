# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps --max-old-space-size=4096

# Копируем весь код в контейнер
COPY . .

# Строим проект Next.js
RUN npm run build

# Указываем порт, на котором приложение будет работать
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
