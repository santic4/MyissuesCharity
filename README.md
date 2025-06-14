# Myissues Charity Platform

---

## Descripción General

Myissues Charity es una aplicación web full-stack que permite:

- **Usuarios**: registrarse, iniciar sesión, ver su perfil.  
- **Campañas**: crear, listar, consultar, actualizar y eliminar.  
- **Donaciones**: enviar donaciones a campañas y ver historial.  
- **Interacciones**: registrar interacciones de “seniors” con agentes.  
- **Panel Admin**: gestionar usuarios, campañas, donaciones e interacciones.

La aplicación está desplegada en **AWS EC2** con HTTPS y sigue un flujo seguro y escalable.

---

## Tecnologías

- **Frontend**  
  - React.js (Vite)  
  - JSX, ESModules  
- **Backend**  
  - Node.js 18+ (ESM)  
  - Express  
  - Sequelize ORM  
- **Base de datos**  
  - PostgreSQL (en contenedor Docker)  
- **Contenerización**  
  - Docker & Docker Compose (desarrollo)  
- **Servidor web / SSL**  
  - Nginx + Certbot (Let’s Encrypt) en AWS EC2  
- **CI/CD**  
  - Script de despliegue `deploy.sh`  
- **DNS**  
  - AWS Route 53  

---

## Estructura del Repositorio

myissues-charity/
├── backend/
│ ├── src/ # Controladores, rutas, modelos, servicios
│ ├── index.js # Entrypoint Express
│ ├── package.json
│ ├── Dockerfile # Imagen producción
│ └── .env.example
├── database/
│ └── schema.sql # Esquema PostgreSQL completo
├── frontend/
│ ├── public/ # index.html, logo.png, favicon…
│ ├── src/ # Componentes, páginas, App.jsx, main.jsx
│ ├── vite.config.js
│ └── package.json
├── docker-compose.yml 
