# Como usar el repo

## Requisitos
- Node JS v16
- npm o yarn
- Docker (Para la base de datos PostgreSQL de desarrollo)

## Variables de entorno

Actualmente el proyecto utiliza las siguientes variables de entorno:
```bash
SERVER_PORT=3011 # Puesto que usara el servidor
ENVIRONMENT=development # Entorno en el que se ejecutara el servidor
DB_HOST="localhost" # Host de la DB
DB_USER="postgres" # Usuario de la DB
DB_NAME="postgres" # Nombre de la DB
DB_PASSWORD="postgres" # Contraseña de la DB
DB_PORT="5432" # Puerto de la de DB
DB_SSL="true" # Por defecto es false
PGSSLMODE="require" # En caso de necesitar SSL para conectarse a la BD, sino omitirlo
AUTH_HOST="http://localhost:3010/api/auth" # Host del servidor de autenticación
PREFIX="/api/crud" # Server prefix
```

## Iniciar el repo para desarrollo

### Ejecutar base de datos

Antes que nada este repo ocupa una base de datos PostgreSQL, para desarrollo local se puede solucionar con levantando una usando el docker-compose.yaml incluido en el servidor y ejecutar las migraciones y seeders con los siguientes comandos
```bash
yarn db:stop # Para cerciorarnos de detener la base de datos si es que ya se había levantado anteriormente.
yarn db:start
```

### Para iniciar el servidor con hot reload
```bash
yarn dev # npm run dev
```

### Compilar y ejecutar código para producción
```bash
yarn build # npm run build
yarn start # npm run start
```

### Probar el funcionamiento del servidor
```bash
yarn test # npm run test
```

### Usar linter para verificar limpieza del código
```bash
yarn lint # npm run lint
```
