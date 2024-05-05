docker run --env 'DB_HOST=host.docker.internal' --env 'AUTH_HOST=http://host.docker.internal:3010' -p 3011:80 --detach jose9348/ctf-crud-microservice:1.0
