# 📚 BookLibrary

Full-stack вебзастосунок для керування електронною бібліотекою. Підтримує реєстрацію, логін, читання книг, збереження прогресу та адміністративне управління.

## 🧰 Технології

- ⚙️ Backend: Java 21 + Spring Boot + JWT
- 🌐 Frontend: React + TypeScript + MUI
- 🗃️ База даних: PostgreSQL
- 🐳 Контейнери: Docker + Docker Compose

## 🚀 Швидкий старт

### 🔧 Попередні вимоги

- Встановлений [Docker](https://www.docker.com/)
- Встановлений [Docker Compose](https://docs.docker.com/compose/)

### 🏁 Запуск застосунку

У кореневій директорії проєкту просто запусти:

```bash
docker-compose up
Це автоматично:

створить базу даних PostgreSQL;

збере backend-сервер на Spring Boot;

запустить фронтенд React-додаток;

налаштує взаємодію між сервісами.

Після запуску:

🌐 Frontend: http://localhost:3000

🔐 Backend API: http://localhost:8080
BookLibrary/
├── backend/         # Spring Boot застосунок
├── frontend/        # React застосунок
├── docker-compose.yml
├── README.md
📦 Структура проєкту
BookLibrary/
├── backend/         # Spring Boot застосунок
├── frontend/        # React застосунок
├── docker-compose.yml
├── README.md
👤 Стандартні користувачі| Роль  | Email                                         | Пароль   |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@example.com](mailto:admin@example.com) | password |
| User  | [user@example.com](mailto:user@example.com)   | password |
