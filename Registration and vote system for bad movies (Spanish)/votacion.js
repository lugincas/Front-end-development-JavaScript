// Luis Ginés Casanova de Utrilla - DWEC
window.addEventListener('load', iniciar, false);

var seleccionPelicula = ""; // Variable global para almacenar la película elegida en el formulario

function iniciar() {

	enviar.addEventListener('click', validar); // Al hacer click en enviar, validamos
	// No se ha definido un botón ni un evento para resetear la información puesto que el propio botón con tipo reset lo realiza

	document.getElementById("calificacion").addEventListener('input', habilitar); // Añadimmos un evento que se activa al cambiar el input de calificación
}

function habilitar() { // La función a la que llama el evento 'input' en el elemento calificación habilita el campo de la descripción, haciendo que su atributo pase a false
	document.getElementById('descripcion').disabled = false;
}

function validar(eventopordefecto) {
	// Inicializamos las variables devolver y resultado.innerHtML
	let devolver = "";
	resultado.innerHTML = "";

	// Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
	if (validarSeleccion(this) & validarCalificacion() & validarDescripcion() && confirm("¿Deseas enviar el formulario?")) {

		eventopordefecto.preventDefault(); // Evitamos un envío real del formulario

		devolver = true;

		resultado.className = "resultadoCorrecto"; // Aplicamos el estilo que hemos configurado para un caso de validación exitosa
		resultado.innerHTML = "<strong>Votación</strong> realizada con éxito:<ul><li>Película: " + seleccionPelicula + "</li><li>Calificación: " + document.getElementById("calificacion").value + "</li><li>Descripción: " + document.getElementById("descripcion").value + "</li></ul>"; // Mostramos por pantalla el resultado de la validación y de los valores de nuestra votación
		
		// Establecemos el contador de envíos exitosos
		if (localStorage.enviosCorrectos) { // Si ya existe el contador, añadimos uno más
			// Se convierte el contador a entero porque por defecto es una cadena
			localStorage.enviosCorrectos = parseInt(localStorage.enviosCorrectos) + 1;
		} else { // Si no existe, lo inicializamos
			localStorage.enviosCorrectos = 1;
		}

		document.getElementById("enviosCorrectos").value = localStorage.enviosCorrectos; // Aplicamos el valor a nuestra casilla correspondiente
	}
	else {
		// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
		eventopordefecto.preventDefault(); // Si se comenta, pueden observarse tanto los campos obligatorios indicados por HTML con required como mi propio mensaje de control de errores
		
		// Establecemos el contador de envíos sin éxito
		if (localStorage.enviosFallidos) { // Si ya existe el contador, añadimos uno más
			// Se convierte el contador a entero porque por defecto es una cadena
			localStorage.enviosFallidos = parseInt(localStorage.enviosFallidos) + 1;
		} else { // Si no existe, lo inicializamos
			localStorage.enviosFallidos = 1; 
		}

		document.getElementById("enviosFallidos").value = localStorage.enviosFallidos; // Aplicamos el valor a nuestra casilla correspondiente

		devolver = false;	// Salimos de la función devolviendo false.
	}
	return devolver;
}

function validarSeleccion(objeto) { // Función encargada de validar la selección de la película
	let devolver = true;
	var formulario = objeto.form;
	let pulsado = false;
	let idPulsado;

	for (let i = 0; i < formulario.elements.length; i++) { // Recorremos el formulario
		if (formulario.elements[i].checked == true) { // Si encontramos uno de los elementos del formulario ya seleccionado (checked), indicamos al programa que ya hay una opción pulsada
			pulsado = true;
			idPulsado = formulario.elements[i].id; // Almacenamos el id del elemento seleccionado

			seleccionPelicula = String(document.getElementById(formulario.elements[i].value + "Etiqueta").innerHTML); // Aunque parezca un poco enrevesado, añadiendo como ID de la etiqueta el mismo valor del input asociado a la misma y la palabra "Etiqueta", podemos llamar de esta forma al texto que hay en la misma y, así, poder utilizarlo mediante la variable global seleccionPelicula en nuestra salida de resultados correctos

		}
	}

	for (let i = 0; i < formulario.elements.length; i++) { // Recorremos el formulario de nuevo para aplicar los estilos a la selección

		if (formulario.elements[i].type == "radio" && pulsado == true) { // Si encontramos ya una opción seleccionada, aplicamos los estilos correspondientes a una validación correcta
			formulario.elements[i].className = "correcto";
			document.getElementById("divSeleccion").className = "";

		} else if (formulario.elements[i].type == "radio" && pulsado == false) { // Si no se ha pulsado ninguna opción, hacemos los siguiente: 
			resultado.innerHTML = "<strong>No has seleccionado ninguna película</strong>. Por favor, elige una para continuar.<br>"; // Lo indicamos
			formulario.elements[i].className = "error"; // Le asociamos la clase "error" para aplicarles el estilo correspondiente a los errores
			formulario.elements[i].focus(); // Hacemos focus en el elemento erróneo
			resultado.className = "resultadoError"; // De igual manera, asociamos un estilo correspondiente a los errores al div de nuestra salida
			document.getElementById("divSeleccion").className = "error"; // También, para resaltar aún más dónde se encuentra el error, añadimos al div correspondiente a la selección de película el estilo asociado a los errores
			devolver = false; // Devolvemos false
		}
	}

	return devolver;
}

function validarCalificacion() { // Función encargada de validar que la calificación introducida sea correcta

	let devolver = true;
	let valorCalificacion = String(document.getElementById("calificacion").value); // Almacenamos el valor de la calificación en una variable y convertimos su tipo en cadena de texto

	if (valorCalificacion !== "") { // Si el campo no está vacío, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("calificacion").className = "correcto";
		devolver = true;
	} else { // Si está vacío, lo indicamos, situamos el foco en el campo de la calificación y le aplicamos el estilo de los errores.
		resultado.innerHTML += "<strong>Califica</strong> la película, por favor.<br>";
		document.getElementById("calificacion").className = "error";
		document.getElementById("calificacion").focus();
		resultado.className = "resultadoError";
		devolver = false;
	}

	return devolver;
}

function validarDescripcion() { // Función encargada de validar que la descripción introducida (si se ha introducido) sea correcta
	const patron = /^[a-zA-ZçÇñÑ\d\s]{5,}$/; // Patrón que valida la existencia de, como mínimo, cinco caracteres alfabéticos en mayúsculas y minúsculas, ç, ñ, dígitos y/o espacios
	let descripcion = String(document.getElementById("descripcion").value); // Almacenamos el valor de la descripción en una variable y convertimos su tipo en cadena de texto
	let devolver = true;

	if (descripcion == "" || patron.test(document.getElementById("descripcion").value)) { // Como es opcional, permitimos que pueda estar vacío, pero de rellenarlo, insistimos en que cumpla el patrón establecido. Si lo cumple, le asociamos al elemento un estilo correspondiente a una validación correcta (clase "correcto" y devolvemos true)
		document.getElementById("descripcion").className = "correcto";
		devolver = true;
	}
	else { // Si el patrón no se cumple, lo indicamos, situamos el foco en el campo de la  descripción y le aplicamos el estilo de los errores.
		resultado.innerHTML += "La <strong>descripción</strong> es opcional, pero si la introduces ha de tener más de 5 caracteres.<br>";
		document.getElementById("descripcion").focus();
		document.getElementById("descripcion").className = "error";
		devolver = false;
	}
	return devolver;
}