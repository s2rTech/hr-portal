FROM node:20-alpine

WORKDIR /app

# Backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Frontend build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Copiar backend
COPY backend/ ./backend/

# El frontend buildeado lo sirve el backend como archivos estáticos
RUN cp -r frontend/dist backend/public

WORKDIR /app/backend
EXPOSE 8080
CMD ["node", "server.js"]