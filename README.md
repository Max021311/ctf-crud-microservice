# Como usar el repo

## Requisitos
- Node JS v16
- npm o yarn
- Docker (Para la base de datos PostgreSQL de desarrollo)

## Variables de entorno

Actualmente el proyecto utiliza las siguientes variables de entorno:
```bash
SERVER_PORT=3010 # Puesto que usara el servidor
ENVIRONMENT=development # Entorno en el que se ejecutara el servidor
DB_HOST="localhost" # Host de la DB
DB_USER="postgres" # Usuario de la DB
DB_NAME="postgres" # Nombre de la DB
DB_PASSWORD="postgres" # Contraseña de la DB
DB_PORT="5432" # Puerto de la de DB
AUTH_HOST="http://localhost:3010" # Host del servidor de autenticación
```

## Iniciar el repo para desarrollo

### Ejecutar base de datos

Antes que nada este repo depende del repo `max021311/ctf-database` que tiene la configuración para la base de datos local así como las migraciones y seeders.

# Para iniciar el servidor con hot reload
```bash
yarn dev # npm run dev
```

## Compilar y ejecutar código para producción
```bash
yarn build # npm run build
yarn start # npm run start
```

## Probar el funcionamiento del servidor
```bash
yarn test # npm run test
```

## Usar linter para verificar limpieza del código
```bash
yarn lint # npm run lint
```
