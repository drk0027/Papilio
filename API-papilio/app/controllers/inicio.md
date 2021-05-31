# Controlador Inicio

# Tabla de contenidos
1. [Descripcion de las APIs](#descripcion)
2. [Ciclo de vida de las transacciones](#ciclo_de_vida)

## Descripcion de las APIs <a name="descripcion_apis"></a>

### ruta

fgsfgsdfg sdf
dfgsdf g



## Ciclo de vida de las transacciones <a name="ciclo_de_vida"></a>
Cuando el usuario presione el boton **"Confirmar Compra"**:

### DESDE EL LADO DEL USUARIO

Se copia el contenido del carrito a la tabla de ordenes
    
|_carrito_|->|_ordenes_|
|---------|--|---------|
|id_oferta|  |id_ofertas|
|id_oferta|  |id_ofertas|
|id_usuario|  |id_usuario|
|cantidad|  |cantidad|
|estado(este estado corresponde a : 1:"Activo")||estado(este campo corresponde a 1:"en proceso",2:"rechazado",3:"cancelado",4:"terminado")|
|||reserva(este campo corresponde a 1:"en reserva", 2:"entregado")|
|||id_transporte|

Se borra el contenido de la tabla de carrito, segun el nombre del usuario que efectua la transaccion (el carrito solo tiene una vida)

    carritos.destroy({where:id_usuario})

Se redirige al usuario a la ventana de ordenes, a la que se puede acceder desde **Perfil/comprar/ordenes**, pero antes se le pregunta si desea contratar un transportista que reciba las compras que hayan sido marcadas como aprobadas.

### DESDE EL LADO DEL NEGOCIO
El usuario poseedor del negocio ve la tabla de ordenes solo para las ofertas que pertenecen a negocios que le pertenecen, mientras tanto, esta tabla contiene todas las ordenes a manera de historial global

|_ordenes_|
|---------|
|id_ofertas|
|id_usuario|
|cantidad|
|estado(este campo corresponde a "en proceso","rechazado","cancelado")|
|reserva(este campo corresponde a "en reserva", "entregado","recibido")|
||
El usuario poseedor del negocio debe hacer los cambios requeridos en el **estado** segun vaya desarrollando la transaccion entre el usuario, para esto, deberan llegar a un acuerdo mediante mensajes.

el usuario antes de continuar con las transacciones, debera haber contratado algun medio de transporte, en caso de haberlo hecho, se crea una tabla de orden de transporte 

|_ordenes_(lo que se pide)|->|_orden_transporte_(quien lo pide)|<-|_transportes_(quien lo lleva)|
|-----|--|----------------|--|----------|
|id_orden||id_orden_transporte||id_transporte|
|id_usuario||id_usuario||nombre|
|cantidad||id_transporte||descripcion|
|estado|
|reserva|
||

    La orden de transporte es una consulta que indica que usuario se ha asociado con que transportista

    La lista de transporte es una consulta (o vista) que permite al transportista, ver las ordenes, cuyos usuarios coincidan con el usuario que ha solicitado el servicio y cuyo estado sea "en reserva"