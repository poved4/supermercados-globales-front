# Etapa 1: Construir la aplicación Angular
FROM node:22-slim AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (si existe) para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con un servidor web
FROM nginx:alpine

# Copiar los archivos construidos al directorio de nginx
COPY --from=build /app/dist/supermercados-globales-front/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
