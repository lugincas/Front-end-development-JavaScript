// Luis Ginés Casanova de Utrilla - DWEC
window.addEventListener('load', iniciar, false);

var valor = ""; // Variable global para almacenar el valor introducido en los campos input

function iniciar() {
	// Declaramos los elementos a los que vamos a aplicar los eventos, para organizar y limpiar un poco más el código, más que nada
	let elementoNombre = document.getElementById("nombre");
	let elementoCodigo = document.getElementById("codigo");
	let elementoContraseniaRepetida = document.getElementById("repetirContrasenia");
	let elementoGeneroFavorito = document.getElementById("generoFavorito");
	let visorContrasenia = document.getElementById("verContrasenia");
// Eventos para el campo del nombre/apellidos
	elementoNombre.addEventListener('keyup', cambiarMayus); // Este evento lo aplicamos al soltar una tecla (lo describo en cambiarMayus)
	elementoNombre.addEventListener('keydown', cambiarMinus); // Este evento lo aplicamos al presionar una tecla (lo describo en cambiarMinus)
	elementoNombre.addEventListener('focusin', cambiarMayus); // Al hacer focus en el input, seguimos por donde lo dejamos aplicando de nuevo cambiarMayus
	elementoNombre.addEventListener('focusout', cambiarMinus); // Al quitar el focus del input, queremos devolverlo a su valor original de la misma forma que hacemos con cambiarMinus, por tanto lo aplicamos de nuevo

// Eventos para el campo del código
	elementoCodigo.addEventListener('keyup', cambiarMayus);
	elementoCodigo.addEventListener('keydown', cambiarMinus);
	elementoCodigo.addEventListener('focusin', cambiarMayus);
	elementoCodigo.addEventListener('focusout', cambiarMinus);
// Eventos para el campo de la repetición de contraseña
	elementoContraseniaRepetida.addEventListener('keyup', cambiarMayus);
	elementoContraseniaRepetida.addEventListener('keydown', cambiarMinus);
	elementoContraseniaRepetida.addEventListener('focusin', cambiarMayus);
	elementoContraseniaRepetida.addEventListener('focusout', cambiarMinus);
// Eventos para el campo del género favorito
	elementoGeneroFavorito.addEventListener('keyup', cambiarMayus);
	elementoGeneroFavorito.addEventListener('keydown', cambiarMinus);
	elementoGeneroFavorito.addEventListener('focusin', cambiarMayus);
	elementoGeneroFavorito.addEventListener('focusout', cambiarMinus);
// Eventos para el botón para visualizar la contraseña repetida
	visorContrasenia.addEventListener('mousedown', verContrasenia);
	visorContrasenia.addEventListener('mouseup', ocultarContrasenia);

	enviar.addEventListener('click', validar); // Al hacer click en enviar, validamos
	/* limpiar.addEventListener('click',resetear); */ // No se ha definido un botón ni un evento para resetear la información puesto que el propio botón con tipo reset lo realiza
}

function verContrasenia() { // Con la función verContrasenia, cambiamos el tipo del campo repetirContrasenia a texto
	document.getElementById("repetirContrasenia").type = 'text';
}
function ocultarContrasenia() { // Con la función verContrasenia, cambiamos el tipo del campo repetirContrasenia a texto
	document.getElementById("repetirContrasenia").type = 'password';
}

function cambiarMayus() { // Con la función cambiarMayus, recogemos el valor original que escribimos por el input correspondiente, lo almacenamos en la variable global y reemplazamos la última letra del valor original con la misma letra en mayúsculas
	valor = String(document.getElementById(this.id).value);
	let ultimaLetra = valor.substring(valor.length - 1); // Obtenemos la última letra del valor introducido
	let letraCambiar = valor.lastIndexOf(ultimaLetra); // Identificamos el índice correspondiente a esa última letra
	let nuevaLetra = ultimaLetra.toUpperCase(); // Obtenemos nuestra nueva letra (que es la última letra que escribimos pasada a mayúsculas)
	let resultado = valor.substring(0, letraCambiar) + nuevaLetra + valor.substring(letraCambiar + 1); // reemplazamos la última letra de nuestra cadena original por su correspondiente en mayúsculas

	document.getElementById(this.id).value = resultado; // Aplicamos la operación de cadenas al value del elemento en el que nos encontramos, para que aparezca en el input

}

function cambiarMinus() { // cambiarMinus simplemente devuelve el value del elemento en el que nos encontramos a su valor original, almacenado en la variable global

	document.getElementById(this.id).value = valor;

}


function validar(eventopordefecto) {
	// Inicializamos las variables devolver y resultado.innerHtML
	let devolver = "";
	resultado.innerHTML = "";
	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	if (validarCampos(this) & validarNombre() & validarCodigo() & validarContrasenia() & repetirContrasenia() & validarGenero() && confirm("¿Deseas enviar el formulario?")) {

		eventopordefecto.preventDefault(); // Evitamos un envío real del formulario
		devolver = true; // Devolvemos true para indicar que la validación ha sido un éxito

		resultado.className = "resultadoCorrecto"; // Aplicamos el estilo que hemos configurado para un caso de validación exitosa
		resultado.innerHTML = "<strong>Inscripción</strong> realizada con éxito:<ul><li>Nombre: " + document.getElementById("nombre").value + "</li><li>Código de invitación: " + document.getElementById("codigo").value + "</li><li>Contraseña elegida: " + document.getElementById("contrasenia").value + "</li><li>Contraseña repetida: " + document.getElementById("repetirContrasenia").value + "</li><li>Género favorito: " + document.getElementById("generoFavorito").value + "</li></ul>"; // Mostramos por pantalla el resultado de la validación y de los valores de nuestra inscripción

	}
	else {
		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		eventopordefecto.preventDefault();
		devolver = false;	// Salimos de la función devolviendo false.
	}
	return devolver;
}

function validarCampos(objeto) { // Función para validar que no haya campos del formulario (obligatorios) vacíos
	let devolver = true;
	var formulario = objeto.form;

	for (let i = 0; i < formulario.elements.length; i++) { // Primero, recorremos los elementos del formulario y aplicamos que, de cero, no tengan ninguna clase asociada
		formulario.elements[i].className = "";
	}

	for (let i = 0; i < formulario.elements.length; i++) { // Recorremos los elementos del formulario de nuevo

		if (formulario.elements[i].type == "text" && formulario.elements[i].value == "" && formulario.elements[i].name == "generoFavorito") { // El elemento correspondiente al género favorito es opcional, así que no pasa nada si está en blanco. No le asociamos ninguna clase

			formulario.elements[i].className = "";

		} else if (formulario.elements[i].type == "text" && formulario.elements[i].value == "") { // En cuanto al resto de elementos, si son de tipo texto y el campo está vacío, hacemos lo siguiente:
			resultado.innerHTML += "El campo <strong>" + formulario.elements[i].name + "</strong> no puede estar en blanco<br>"; // Lo indicamos
			formulario.elements[i].className = "error"; // Le asociamos la clase "error" para aplicarles el estilo correspondiente a los errores
			formulario.elements[i].focus(); // Hacemos focus en el elemento erróneo
			resultado.className = "resultadoError"; // De igual manera, asociamos un estilo correspondiente a los errores al div de nuestra salida
			devolver = false; // Devolvemos false

		}

	}

	return devolver;
}

function validarNombre() { // Función encargada de validar que el nombre cumple con los requisitos 
	
	const patron = /^[a-zA-ZçÇñÑ\s]{10,45}$/; // Patrón para controlar que el campo sea un nombre simple seguido de espacio o espacios y luego el primer apellido, con carácteres mayúsculas y minúsculas incluyendo ñ y ç pero no acentos (de 10 a 45)
	let devolver = true;

	if (patron.test(document.getElementById("nombre").value)) { // Si el patrón se cumple con el valor introducido, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("nombre").className = "correcto";
		devolver = true;
	}
	else { // Si el patrón no se cumple, lo indicamos ofreciendo una pequeña guía
		resultado.innerHTML += "El <strong>nombre</strong> introducido no es correcto.\n\nPor favor, escribe un nombre simple y tu primer apellido, sin tildes.<br>";

		// Situamos el foco en el campo del nombre y le asignamos la clase error.
		document.getElementById("nombre").focus();
		document.getElementById("nombre").className = "error";
		devolver = false;
	}
	return devolver;
}

function validarCodigo() { // Función encargada de validar que el código cumpla con los requisitos 
	const patron = /^\d{3}[^AEIOU]{2}$/; // Patrón para controlar que el código de invitación esté compuesto por tres dígitos seguidos de dos letras mayúsculas sin vocales
	let devolver = true;

	if (patron.test(document.getElementById("codigo").value)) { // Si el patrón se cumple con el valor introducido, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("codigo").className = "correcto";
		devolver = true;
	}
	else { // Si el patrón no se cumple, lo indicamos ofreciendo una pequeña guía
		resultado.innerHTML += "El <strong>código</strong> introducido no es correcto.\n\nPor favor, escribe tu código con tres dígitos seguidos de dos consonantes mayúsculas.<br>";

		// Situamos el foco en el campo del código y le asignamos la clase error.
		document.getElementById("codigo").focus();
		document.getElementById("codigo").className = "error";
		devolver = false;
	}
	return devolver;
}

function validarContrasenia() { // Función encargada de validar que la contraseña cumpla con los requisitos 
	const patron = /^(?=^[A-Z])(?=.*[a-z])(?=^[^\.]*\.[^\.]*$)(?=^[^\d]*\d?[^\d]*\d?[^\d]*\d[^\d]*$)(?!.*from)(?!.*insert)(?!.*delete)(?!.*FROM)(?!.*INSERT)(?!.*DELETE)(?=.*\,\^$)(^.{9,21}$)$/; //Patrón para controlar que la contraseña comience con mayúsculas; tenga minúsculas; tenga de uno a tres dígitos no necesariamente consecutivos; no aparezcan las cadenas from, insert o delete; tenga un solo punto, pueda tener otros caracteres; termine en el carácter ^ precedido de una coma; con al menos 9 caracteres y máximo 21 caracteres.

	// Ejemplo de contraseña buena: Kkkkk.1f2f3ss,^

	let devolver = true;

	if (patron.test(document.getElementById("contrasenia").value)) {// Si el patrón se cumple con el valor introducido, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("contrasenia").className = "correcto";
		devolver = true;
	}
	else {// Si el patrón no se cumple, lo indicamos ofreciendo una guía
		resultado.innerHTML += "La <strong>contraseña</strong> introducida no es correcta.\n\nTu contraseña debe:<ul><li>Comenzar en Mayúscula.</li><li>Tener minúsculas.</li><li>Tener al menos un dígito (máximo tres).</li><li>No incluir las cadenas 'from', 'insert' o 'delete'.</li><li>Contener un sólo punto '.'.</li><li>Terminar con el carácter '^' precedido de una coma ','.</li><li>Tener entre 9 y 21 caracteres.</li></ul>";

		// Situamos el foco en el campo contraseña y le asignamos la clase error.
		document.getElementById("contrasenia").focus();
		document.getElementById("contrasenia").className = "error";
		devolver = false;
	}
	return devolver;
}

function repetirContrasenia() { // Función encargada de comprobar que los parámetros introducidos para la contraseña se cumplan por segunda vez
	const patron = /^(?=^[A-Z])(?=.*[a-z])(?=^[^\.]*\.[^\.]*$)(?=^[^\d]*\d?[^\d]*\d?[^\d]*\d[^\d]*$)(?!.*from)(?!.*insert)(?!.*delete)(?!.*FROM)(?!.*INSERT)(?!.*DELETE)(?=.*\,\^$)(^.{9,21}$)$/; // Mismo patrón que para la contraseña

	let devolver = true;
	let contraseniaIntroducida = document.getElementById("contrasenia").value; // Almacenamos la contraseña que hemos introducido previamente en una variable
	let contraseniaRepetida = document.getElementById("repetirContrasenia").value; // Almacenamos nuestra segunda contraseña recién introducida

	if (patron.test(document.getElementById("repetirContrasenia").value) && contraseniaIntroducida == contraseniaRepetida) { // Si el patrón se cumple con el valor introducido y este valor coincide con el que introdujimos en la primera validación, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("repetirContrasenia").className = "correcto";
		devolver = true;
	}
	else {// Si el patrón no se cumple, lo indicamos ofreciendo una guía
		resultado.innerHTML += "La <strong>repetición de la contraseña</strong> introducida no es correcta.\n\nPor favor, introduce la misma contraseña.<br>";

		// Situamos el foco en el campo de la segunda contraseña y le asignamos la clase error.
		document.getElementById("repetirContrasenia").focus();
		document.getElementById("repetirContrasenia").className = "error";
		devolver = false;
	}
	return devolver;
}

function validarGenero() { // Función encargada de validar que el género introducido cumpla con los requisitos
	const patron = /^[a-zA-ZçÇñÑ\s]*$/; // Con esta expresión regular, además de caracteres alfabéticos, también admitimos el espacio en blanco para que pueda validarse sin que sea obligatorio añadirlo.
	let devolver = true;

	if (patron.test(document.getElementById("generoFavorito").value)) { // Si el patrón se cumple con el valor introducido, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("generoFavorito").className = "correcto";
		devolver = true;
	}
	else { // Si el patrón no se cumple, lo indicamos ofreciendo una pequeña guía
		resultado.innerHTML += "El <strong>género de película</strong> introducido no es correcto.\n\nPor favor, no introduzcas números ni letras con tildes.<br>";

		// Situamos el foco en el campo del género favorito y le asignamos la clase error.
		document.getElementById("generoFavorito").focus();
		document.getElementById("generoFavorito").className = "error";
		devolver = false;
	}
	return devolver;
}


