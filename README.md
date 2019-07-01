# Consultas LNH

Ésta es una aplicación de [NodeJS](https://nodejs.org/en/) utilizando [Express](https://expressjs.com/) y [React](https://reactjs.org/) para consultar y listar la base de datos de LNH para CNRT

## Requerimientos

- Linux
- NodeJS v12.4.0
- npm
- nginx

## Instalación

Luego de instalar los requerimientos solicitados, se deberá correr el siguiente comando sobre el directorio principal

`npm run install`

## Configuración

Las configuraciones de acceso a la base de datos MSSQL se llenan en `config.json`

### Puertos

La aplicación correrá en 2 instancias (backend / frontend), es por eso que será necesario configurar 2 puertos. Los cuales deberán ser especificados en los siguientes archivos

#### Backend

- `client/package.json:proxy`

- `config.json:port`

#### Frontend

- `package.json:scripts.deploy`

## Deploy

Para correr la aplicación ejecutar el siguiente comando

`npm run deploy`

Correrá sobre dos instancias de pm2, para más información consultar [aquí](http://pm2.keymetrics.io).

## Instrucciones futuras

Ees recomendable usar [nginx](https://www.nginx.com/) como forma de alojamiento en un servidor web.

### Autor

[Ariel Leandro Aguirre](mailto:ariedro@gmail.com)