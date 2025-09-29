// Luis Ginés Casanova de Utrilla - DWEC

window.addEventListener('load', iniciar, false); // Al cargar la página, disparamos nuestra función iniciar()

/* DECLARACIÓN DE VARIABLES GLOBALES */

var dimensionModificada;
var imagenParada = false;
var imagenMover;
var divLienzo;

/* CREACIÓN DE FUNCIONES */

/* Función para crear todos los elementos, asignarles atributos y adherirlos a sus nodos padres correspondientes */
function iniciar() {
    /* CREACIÓN DE ELEMENTOS */

    // Creación de div para la maquetación
    let divMaqueta = document.createElement('div');

    // Creación de div principales
    divLienzo = document.createElement('div'); // Este elemento necesitamos declararlo como una variable global, para poder operar con él con otras funciones
    let divContenedorImagenes = document.createElement('div');
    let divFormulario = document.createElement('div');

    // Creación de formulario
    let formularioEfectos = document.createElement('form');

    // Creación de inputs para el formulario
    let inputDisminuir = document.createElement('input');
    let inputAumentar = document.createElement('input');
    let inputBorrar = document.createElement('input');

    // Creacion de párrafos para el formulario
    let parrafoDisminuir = document.createElement('label');
    let parrafoAumentar = document.createElement('label');
    let parrafoBorrar = document.createElement('label');
    let primerSaltoParrafo = document.createElement('br');
    let segundoSaltoParrafo = document.createElement('br');

    // Creación de texto para los párrafos del formulario
    let textoDisminuir = document.createTextNode('Disminuir tamaño');
    let textoAumentar = document.createTextNode('Aumentar tamaño');
    let textoBorrar = document.createTextNode('Borrar');

    // Creación del botón para guardar imagen
    let botonGuardar = document.createElement('a');
    let textoGuardar = document.createTextNode('Guardar JPG');
    botonGuardar.setAttribute('id', 'botonGuardar');
    botonGuardar.appendChild(textoGuardar);

    /* ATRIBUTOS */

    // Atributos de los divs (ID)
    divMaqueta.setAttribute('id', 'maqueta');
    divLienzo.setAttribute('id', 'lienzo'); //855 height, 1570 width
    divContenedorImagenes.setAttribute('id', 'contenedor');
    divFormulario.setAttribute('id', 'formulario');

    // Atributos para el formulario 
    formularioEfectos.setAttribute('id', 'formularioEfectos');
    formularioEfectos.setAttribute('action', '');

    // Atributos de los inputs 
    inputDisminuir.setAttribute('type', 'radio');
    inputDisminuir.setAttribute('value', 'disminuir');
    inputDisminuir.setAttribute('name', 'opciones');
    inputAumentar.setAttribute('type', 'radio');
    inputAumentar.setAttribute('value', 'aumentar');
    inputAumentar.setAttribute('name', 'opciones');
    inputBorrar.setAttribute('type', 'radio');
    inputBorrar.setAttribute('value', 'borrar');
    inputBorrar.setAttribute('name', 'opciones');

    /* ASIGNACIÓN DE NODOS */

    // Asignación de nodos de texto a los párrafos
    parrafoDisminuir.appendChild(textoDisminuir);
    parrafoAumentar.appendChild(textoAumentar);
    parrafoBorrar.appendChild(textoBorrar);

    // Asignación de párrafos e inputs al formulario
    formularioEfectos.appendChild(inputDisminuir);
    formularioEfectos.appendChild(parrafoDisminuir);
    formularioEfectos.appendChild(primerSaltoParrafo);
    formularioEfectos.appendChild(inputAumentar);
    formularioEfectos.appendChild(parrafoAumentar);
    formularioEfectos.appendChild(segundoSaltoParrafo);
    formularioEfectos.appendChild(inputBorrar);
    formularioEfectos.appendChild(parrafoBorrar);

    divFormulario.appendChild(formularioEfectos);
    divFormulario.appendChild(botonGuardar);

    // Asignación de imágenes al contenedor mediante la función imagenes()
    imagenes(5, divContenedorImagenes);

    // Asignación de los tres divs principales al div de maquetación de la página
    divMaqueta.appendChild(divLienzo);
    divMaqueta.appendChild(divContenedorImagenes);
    divMaqueta.appendChild(divFormulario);

    document.body.appendChild(divMaqueta);
}

/* Función para asignar las imágenes al contenedor de imágenes, indicando como parámetro el número total de imágenes que queremos añadir y el contenedor al que las añadimos */
function imagenes(numeroImagenes, contenedorImagenes) { // De esta manera, si tuvieramos más imágenes sólo habría que poner el máximo de imágenes que tenemos en la carpeta. Eso sí, deberían guardar el mismo formato para poder rescatarlas por su nombre utilizando el bucle
    for (let i = 1; i < numeroImagenes + 1; i++) { // En cada iteración, se hace lo siguiente:
        let imagen = document.createElement('img'); // Se crea un elemento img, para imágenes
        imagen.setAttribute('id', 'imagen' + i); // Se le atribuye un id, compuesto por la palabra imagen y su número
        imagen.setAttribute('src', 'imagenes/im' + i + '.png'); // Se le atribuye al elemento la imagen en cuestión, mediante el atributo src y la url, rescatando la imagen correspondiente a esa iteración
        imagen.setAttribute('class', 'imagenesContenedor'); // Se le atribuye un id, compuesto por la palabra imagen y su número
        contenedorImagenes.appendChild(imagen); // Asignamos la imagen al contenedorImagenes

        imagen.addEventListener('click', duplicarImagen); // Por último, le asignamos un evento 'click' que dispara la función duplicarImagen, duplicando el nodo en cuestión sobre el lienzo
    }

}

/* Función para duplicar el nodo imagen elegido sobre el lienzo */
function duplicarImagen() {
    let elementoExistente = document.getElementById(this.id + 'Clonada'); // En primer lugar, declaramos una variable llamada elementoExistente para almacenar el elemento con el id resultante de haber sido clonado.

    if (elementoExistente == null) { // Si el elemento es igual a null, significa que no existe y se puede crear. De esta forma limitamos la duplicación a una por imagen.

        let nodoClonado = document.getElementById(this.id).cloneNode(); // Clonamos la imagen con cloneNode() y la almacenamos en una variable llamada nodoClonado

        nodoClonado.setAttribute('class', 'imagenClonada'); // Le asignamos una clase que hemos definido en nuestra hoja de estilos para que el tamaño con el que aparezca la copia sobre el lienzo sea mayor que la que tiene la original en el contenedor
        nodoClonado.style.left = "30px"; // Añadimos un margen de 30px para que el nodo duplicado no aparezca pegado al lado izquierdo del lienzo
        nodoClonado.style.top = "30px"; // Añadimos un margen de 30px para que el nodo duplicado no aparezca pegado al lado superior del lienzo

        nodoClonado.setAttribute('id', this.id + 'Clonada'); // Le asignamos un id, compuesto por su ID original y la palabra 'Clonada', de manera que nos sirva para hacer la comprobación con elementoExistente

        nodoClonado.addEventListener('mousedown', arrastrarImagen, false); // Le asignamos un evento 'mousedown', que disparará la función arrastrarImagen cuando mantengamos presionado el botón del ratón sobre el elemento

        nodoClonado.addEventListener('click', modificarImagen, false); // Le asignamos un evento 'click' para que modifique la imagen mediante clicks sobre la misma. La modificación dependerá de la opción del formulario seleccionada y se desarrollará dentro de la propia función

        dimensionModificada = document.getElementById(this.id).width + 100; // la dimensión modificada se resetea al obtener una nueva copia, para que no almacene el tamaño de la copia anterior. El valor es el correspondiente al tamaño de la imagen + 100 píxeles que es lo que añadíamos en su hoja de estilo (200px)

        for (let i = 0; i < document.getElementsByName("opciones").length; i++) { // Cada vez que clonamos una imagen, deseleccionamos las opciones del formulario, para que no empecemos con alguna seleccionada y directamente podamos cambiar su tamaño o borrarla
            document.getElementsByName("opciones")[i].checked = false;
        }
        divLienzo.appendChild(nodoClonado); // Asignamos el nodo al lienzo, para que aparezca en el mismo

        capturarImagen(); // Establecemos una primera posibilidad de captura de imagen, para que cada vez que tengamos un nodo nuevo sobre el lienzo, podamos guardar la imagen como estaba hasta ese momento. Si no hicieramos esto, aunque pudieramos capturar la imagen una vez hemos compuesto el lienzo, si añadiésemos un nuevo elemento este no aparecería en la captura hasta que lo moviésemos y dejásemos en algún sitio
    }

}

/* Función para modificar la imagen según la opción del formulario elegida */
function modificarImagen() {

    if (document.getElementsByName("opciones")[0].checked == true) { // Si la opción 'Disminuir tamaño' (posición 0 del array de elementos con nombre "opciones") está seleccionada, disminuimos el tamaño de la imagen en diez píxeles
        dimensionModificada = dimensionModificada - 10;
        document.getElementById(this.id).style.width = dimensionModificada + "px";
    } else if (document.getElementsByName("opciones")[1].checked == true) { // Si la opción 'Aumentar tamaño' (posición 1 del array de elementos con nombre "opciones") está seleccionada, aumentamos el tamaño de la imagen en diez píxeles
        dimensionModificada = dimensionModificada + 10;
        document.getElementById(this.id).style.width = dimensionModificada + "px";
    } else if (document.getElementsByName("opciones")[2].checked == true) { // Si la opción 'Borrar' (posición 2 del array de elementos con nombre "opciones") está elegida, borramos el nodo en cuestión
        divLienzo.removeChild(document.getElementById(this.id));
        document.getElementsByName("opciones")[2].checked = false; // Al utilizarla, la deseleccionamos para evitar borrar otros elementos por error
        
    }
    capturarImagen(); // Establecemos otro "checkpoint" para guardar la información de la imagen después de cualquier modificación en nuestro enlace de descarga
}

/* Función para activar el movimiento de la imagen al hacer mousedown */
function arrastrarImagen() {
    imagenParada = false; // Asignamos false a la variable que nos indica que la imagen ha parado
    imagenMover = document.getElementById(this.id); // Asignamos el elemento que vamos a mover a una variable global, para operar con él

    document.addEventListener('mousemove', moverImagen, false); // La imagen que esta siendo arrastrada empieza a escuchar el evento 'mousemove', que nos permitirá mover la imagen
}

/* Función para mover la imagen que hemos empezado a arrastrar */
function moverImagen(evento) {
    /* La posición de la imagen en relación al cursor será la localización del ratón - 60 píxeles, para que parezca que el ratón está encima de la imagen y no se vaya a una de las esquinas */
    let posicionX = evento.clientX - 60;
    let posicionY = evento.clientY - 60;

    imagenMover.style.zIndex = "2"; // Mientras está siendo arrastrada, la imagen se posiciona en la capa superior
    imagenMover.style.left = posicionX + "px"; // Modificamos la posición horizontal de la imagen siguiendo el movimiento del cursor
    imagenMover.style.top = posicionY + "px"; // Modificamos la posición vertical de la imagen siguiendo el movimiento del cursor

    document.addEventListener('mousedown', pararMovimiento, false); // La imagen que se está moviendo empieza a escuchar el evento 'mousedown', que nos permitirá parar el movimiento al hacer click de nuevo

    /* Limitación del movimiento de la imagen en función del tamaño del lienzo y de la propia imagen. Para ello, jugamos con los píxeles de la posición del cursor, el tamaño del mismo y el tamaño de las imágenes */

    // LÍMITE DERECHA
    if (evento.clientX > divLienzo.clientWidth - imagenMover.width + 60) { // Si la posición del cursor es mayor que el ancho máximo del lienzo menos el ancho de la imagen y la suma de los 60 píxeles que habíamos restado al principio, la posición vertical de la imagen se conserva pero limitamos su movimiento horizontal hacia la derecha
        imagenMover.style.left = (divLienzo.clientWidth - imagenMover.width) + "px"; // El límite de movimiento horizontal hacia la derecha sería el ancho máximo del lienzo menos el tamaño de la imagen, para que se vaya redimensionando al tamaño de los mismos en caso de que reduzcamos el tamaño de la ventana o de la propia imagen
    }

    // LÍMITE IZQUIERDA
    if (evento.clientX < imagenMover.width / 2) { // Si la posición del cursor es menor que los pixeles correspondientes a la mitad del ancho de la imagen, la posición vertical de la imagen se conserva pero limitamos su movimiento horizontal hacia la izquierda
        imagenMover.style.left = "30px"; // El límite de movimiento horizontal hacia la izquierda sería la posición en la que inicia el nodo duplicado
    }

    // LÍMITE ARRIBA
    if (evento.clientY < imagenMover.height / 2) {// Si la posición del cursor es menor que los pixeles correspondientes a la mitad del alto de la imagen, la posición horizontal de la imagen se conserva pero limitamos su movimiento vertical hacia arriba
        imagenMover.style.top = "30px"; // El límite de movimiento vertical hacia arriba sería la posición en la que inicia el nodo duplicado
    }

    // LÍMITE ABAJO
    if (evento.clientY > divLienzo.clientHeight - imagenMover.height + 60) { // Si la posición del cursor es mayor que el alto máximo del lienzo menos el alto de la imagen y la suma de los 60 píxeles que habíamos restado al principio, la posición horizontal de la imagen se conserva pero limitamos su movimiento vertical hacia abajo
        imagenMover.style.top = (divLienzo.clientHeight - imagenMover.height) + "px";
    }

    /* En caso de que hayamos vuelto a hacer click en la imagen y hayamos activado la función pararMovimiento() */
    if (imagenParada) { // Si nuestra variable imagenParada es verdadera, hacemos lo siguiente
        document.removeEventListener('mousemove', moverImagen); // La imagen deja de escuchar el evento 'mousemove' en el que nos encontramos y que estaba ejecutándose
        document.removeEventListener('mousedown', pararMovimiento, false); // La imagen deja de escuchar el evento 'mousedown' que hace que la imagen se pare si está en movimiento, para que, al volver a hacer 'mousedown' se active arrastrarImagen y volvamos a escuchar el evento 'mousemove' que reactiva el movimiento

        imagenParada = false; // Devolvemos el valor false a nuestra variable global
        imagenMover.style.zIndex = "1"; // La imagen que hemos parado pasa a un segundo plano, por debajo de la que esté en movimiento
        capturarImagen(); // Establecemos otro punto de captura de la información de nuestro lienzo, para que podamos descargar la imagen tal y como la hemos dejado después de parar el último elemento que estaba en movimiento
    }
}

/* Función que activa la parada del movimiento */
function pararMovimiento(evento) { 
    /* Como el evento 'mousemove' se ejecuta constantemente, al hacer nuestro segundo click activamos el 'mousedown' que habíamos programado para que disparase esta función. Al hacerlo, cambiamos el valor de nuestra variable imagenParada y ejecutamos directamente el if que se encuentra dentro de moverImagen(), que contiene las instrucciones necesarias para que la imagen deje de moverse */
    imagenParada = true;  
}


/* Función para establecer la información de captura gráfica del lienzo y posibilita su descarga */
function capturarImagen() {
    let captura = document.getElementById('lienzo'); // Obtenemos el elemento correspondiente al lienzo y lo almacenamos en la variable captura

    /* Gracias a la libreria html2canvas, podemos utilizar una función que nos permita transformar la información de nuestro lienzo en una URL y descargarla */
    html2canvas(captura).then(lienzo => {
        let url = lienzo.toDataURL();
        descargarImagen(url);
    });
    /* Creamos una función que nos permita descargar el contenido de la URL generada por html2canvas()*/
    function descargarImagen(urlDeImagen) {
        let enlace = document.getElementById('botonGuardar'); // Para asociar la URL de descarga a un botón, obtenemos nuestro elemento correspondiente y lo almacenamos en una variable para realizar las asignaciones

        enlace.href = urlDeImagen; // Asociamos la descarga a nuestro botón/enlace
        enlace.download = "ImagenPirata.jpg"; // Elegimos el formato de descarga y el nombre
    }
}

