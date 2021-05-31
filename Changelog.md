# Changelog
## 17/05/2021
- Creacion de la estructura de paginas a seguir
- Creacion del modelo jerarquia de usuario
- Creacion del protocolo de seguridad
  
## 18/05/2021
- Creacion del sistema de login del usuario
  - Actualizacion del protocolo de login del backend
  - Declaracion de uso del sistema jwt para protocolo de seguridad
  - Declaracion del uso de REST para comunicaciones entre BackEnd y FrontEnd

## 19/05/2021
- Correcciones menores al sistema de login del FrontEnd
- Correcciones menores al sistema de login del BackEnd
- Agregado el sistema de roles para el Backend

## 20/05/2021
- Correcciones menores al NavBar
- Se establece un sistema para determinar el estado de la sesion del usuario mediante props
- Establecido sistema de login y soporte heredado navbar

|Componente|Envia|Recibe|
|----------|-----|------|
|Pagina*|ServerloggedIn,token||
|Layout|ServerloggedIn,token|ServerloggedIn,token|
|NavBar||ServerloggedIn,token|



\* **Cualquier pagina que llame a los componentes hijos a continuacion**

- El menu de usuario cambia segun el tipo de usuario

**Usuario Visitante**
- Sobre Nosotros
- Ofertas
- Quienes somos
- Iniciar Sesion

**Usuario Normal**
- Ofertas
- Quienes Somos
- Perfil
- Cerrar Sesion

**Usuario Administrador**
- Perfil
- Ofertas
- Archivos
- Administrador
- Cerrar Sesion

## 21/05/2021
- Se crea el componente AdminBar, el cual es cargado unicamente por los componentes que lo necesiten, asi que no tiene variables de entrada
- Se modifica el AdminBar para que funcione con NextJs
- Se agregan los menues Sistema, Usuarios y ofertas
- La pagina de inicio "/" en caso de iniciar sesion como administrador, muestra el dashboard en el menu de configurar Sistema

## 21/05/2021
- Se agregan componentes a la pagina de inicio para cuando el usuario es administrador
- Bajo el menu Sistema/Configuracion se despliega el formulario que permite editar las configuraciones relacionadas con el SEO
- se agregan los campos relacionados con el backend:
  - **Nombre de la empresa:** Utilizado en el sistema SEO
  - **Nombres del propietario:** Utilizado en el formulario de contacto
  - **Apellidos del propietario:** Utilizadn en el formulario de contacto
  - **Descripcion del Negocio:** Utilizado en el sistema SEO y formulario de contacto
  - **Numero de contacto 1:** Utilizado en el sistema SEO y formulario de contacto
  - **Numero de contacto 2:** (Opcional) Utilizado en el sistema SEO y formulario de contacto
  - **Direccion del negocio:** Utilizado en el sistema SEO, Formulario de contacto y localizacion
  - **Correo Electronico 1:** Utilizado en el sistema SEO, Formulario de contacto y localizacion
  - **Correo Electronico 2:** (opcional)Utilizado en el sistema SEO, Formulario de contacto y localizacion
- Agregado submenu de seguridad al menu de Sistema
- Agregada tabla de configuracion general del Sistema

|Archivo|Tipo|Funcion|
|----|----|-------|
|models/sistema.model.js|modelo|Tabla de configuracion del sistema|
|routes/admin.routes.js|rutas|Ruta de llamadas de api para usuarios con rol de administracion|
|controllers/admin.controller.js|controlador|Controlador para las llamadas de api mediante la ruta admin.routes.js|

## 22/05/2021
- Reconstruido sistema de comunicacion con la API

**Headers**
|nombre|valor|
|------|-----|
|Content-Type|application/json|
|x-access-token|token|

**Body**

**tipo:** raw

**valor**

    {
         "donde": "", //Lista de columnas en caso de busqueda, separadas por signo igual y caracter de tuberia (ex: id_usuario=1|nombre="juanito piguave")
         "limite": "", //funciona normal
         "off":"", //cuantos cosos por pagina 
         "orden":"id_sistema DESC" //ordena descendente o ascendente por nombre de columna, no olvidar llenar este campo para no generar error
    }

## 26/05/2021
- reconstruccion del sistema de API fase 2

|Nombre del Campo|Valor|Descripcion|
|----------------|-----|-----------|
|columnas|["col1","col2","col3"]|Lista de columnas que se desea obtener en la consulta|
|donde|[["col","=","val"]["col2","=","val2"]["col3","=","val"]]|Array de arrays conteniendo el nombre de la columna, el operador y el valor|
|orden|["col","asc/desc"]|Array con el nombre de la columna y el operador de orden (asc/desc)|
|limite|["page","offset"]|Array con el numero de pagina y el numero de offset|

## 27/05/2021
- Reconstruccion del sistema de API fase 3
- Los llamados a la api dependen del backend, de esta manera, el CRUD queda asi:

|Tipo de llamado|Rol del usuario|Descripcion|
|---------------|---------------|-----------|
|Ver_[x]|Admin|Este llamado permite obtener una lista de elementos de la base de datos, se usa para la edicion de datos y no requiere seleccion de las columnas|

## 28/05/2021
- Reconstruccion del sistema de API fase 4
- se separa la interfaz grafica de las paginas en NextJS en componentes que se ocupan de toda su logica
- los componentes heredan los datos segun sean llamados por los roles de admin o user
- las paginas deciden que componente cargar segun el estado de la sesion y el tipo dee usuario que hace el llamado
- las operaciones CRUD dependen del backend
## 29/05/2021
- Reconstruccion del sistema de API fase 5
- completado sistema de lectura de datos del backend
- completado sistema de escritura/sobreescritura de datos del backend
- completado sistema modular de componentes
- completado sistema modular de rutas y paginas para nextjs
- completado sistema de gestion de estados para los elementos de formularios de los componentes
- desarrollo temporal de la pagina de inicio para usuarios sin sesion.

## 30/05/2021
- Actualizado el NavBar
  - al iniciar la carga de una pagina, se consulta la api publica info_sistema, para obtener el nombre de la empresa, y otros datos
- Creada la pagina de Informacion sobre el negocio
- Creada la pagina de contacto
- Creado el componente de Informacion sobre el negocio
- Creado el componente de formulario de contacto
  - Agregado el modelo de contactos
  - Agregado el formato para agregar datos
  - Se registra la direccion ip de la persona interesada
  - 