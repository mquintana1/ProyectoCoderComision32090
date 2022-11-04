## Servidor con balance de carga

### Consignas

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

Ejemplo:
- pm2 start ./miservidor.js -- --port=8080 --modo=fork
- pm2 start ./miservidor.js -- --port=8081 --modo=cluster
- pm2 start ./miservidor.js -- --port=8082 --modo=fork

### Resolución

Se realizó directamente con pm2 ya que este por parámetro permite recibir si se desea que sea modo fork o modo cluster.

Generamos 4 clusters en 8082, 8083, 8084 y 8085

```console

pm2 start ./src/server.js --name="ClusterEn8082" --watch -i 2  -- -p 8082
pm2 start ./src/server.js --name="ClusterEn8083" --watch -i 2  -- -p 8083
pm2 start ./src/server.js --name="ClusterEn8084" --watch -i 2  -- -p 8084
pm2 start ./src/server.js --name="ClusterEn8085" --watch -i 2  -- -p 8085

```



Comprobamos la lista:

```console

pm2 list
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │        
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤        
│ 0   │ ClusterEn8082    │ default     │ 1.0.0   │ cluster │ 24240    │ 65s    │ 2    │ online    │ 0%       │ 30.3mb   │ mqu… │ enabled  │
│ 1   │ ClusterEn8082    │ default     │ 1.0.0   │ cluster │ 20460    │ 65s    │ 2    │ online    │ 0%       │ 29.9mb   │ mqu… │ enabled  │
│ 2   │ ClusterEn8083    │ default     │ 1.0.0   │ cluster │ 26744    │ 65s    │ 2    │ online    │ 0%       │ 30.3mb   │ mqu… │ enabled  │
│ 3   │ ClusterEn8083    │ default     │ 1.0.0   │ cluster │ 24016    │ 65s    │ 2    │ online    │ 0%       │ 31.1mb   │ mqu… │ enabled  │
│ 4   │ ClusterEn8084    │ default     │ 1.0.0   │ cluster │ 7272     │ 65s    │ 2    │ online    │ 0%       │ 30.3mb   │ mqu… │ enabled  │
│ 5   │ ClusterEn8084    │ default     │ 1.0.0   │ cluster │ 17544    │ 65s    │ 2    │ online    │ 0%       │ 30.2mb   │ mqu… │ enabled  │
│ 6   │ ClusterEn8085    │ default     │ 1.0.0   │ cluster │ 9760     │ 65s    │ 2    │ online    │ 0%       │ 31.2mb   │ mqu… │ enabled  │
│ 7   │ ClusterEn8085    │ default     │ 1.0.0   │ cluster │ 26072    │ 65s    │ 2    │ online    │ 0%       │ 30.2mb   │ mqu… │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘ 

```

Ahora solamente debemos editar nuestro archivo de configuración de nginx para redigir cuando se vaya a /test/random que vaya a -> /test/randoms de los servidores creados anteriormente.


    ```console

events {
}

http {

    upstream backend {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }
    server {
        listen 8080;
        location /test/random/ {
            proxy_pass http://backend/test/randoms/;
        }
    }

}

```

Frenamos y volvemos a prender el servicio

```console

```

Y listo, podemos acceder a través de http://localhost:8080/test/random/

