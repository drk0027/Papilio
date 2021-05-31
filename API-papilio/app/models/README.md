# Sistema de modelado de base de datos

este sistema permite crear una imagen virtual que puede ser volcada durante el periodo de desarrollo a la base de datos real, con el fin de administrar consultas complejas usando sequelize.

## Observaciones

- Todas las tablas tienen nombres en plural, pero los codigos de identificacion (primary key) estan en singular porque se refiere a una fila de la tabla
- Todas las claves primarias tienen que tener un formato *id_xxx*
- Recuerda que si el nombre de las tablas no coincide con lo que esperas, debes establecer un alias primero


## Sistema de archivos

- index.js: este archivo unifica todos los modelos creados hasta el momento, los controladores y middlewares deben llamar desde aqui. Aqui tambien se describen las relaciones entre las tablas
- xxx.model.js: este archivo contiene la declaracion completa de la tabla creada

## Modelos

**Mensajes**

- id_mensaje
- contenido
- fecha_creacion
- cantidad_palabras

> mensajes belongsTo usuarios por 'id_usuario' : relacion uno a uno de mensajes desde usuarios por id
> mensajes belongsTo canales por 'id_canal' : relacion uno a uno de mensajes desde usuarios por id

**Usuarios**

- id_usuario
- nombre_usuario
- username
- email
- password
- fecha_ultimo_mensaje
- fecha_descubrimiento
- palabras
- contador_mensajes

> un usuario puede tener muchos roles
> un rol puede tener muchos usuarios
> se usa el sistema belongtomany para crear una tabla que una las dos tablas

**Roles**



