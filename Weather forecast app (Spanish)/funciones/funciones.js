// Luis Ginés Casanova de Utrilla - DWEC

window.addEventListener('load', iniciar, false); // Al cargar la página, disparamos nuestra función iniciar()
function iniciar() {

  const MICLAVE = "382f708423a243e689593156250805"; // Clave facilitada por Weather Api al registrarme

  var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; // Declaramos esta variable como global para pasar opciones a nuestra función toLocaleDateString() y formatear las fechas más adelante

  /* CONSULTA FETCH A WEATHER API (Día actual) */

  $(function () {
    /* Función que se dispara al hacer click en nuestro botón para ver la previsión del tiempo de hoy */
    $("#tiempoActual").click(function () {

      $("#tiempoHoy").html("<img src='imagenes/ajax-loader.gif'>"); // Cargamos en el html el ajax-loader

      fetch("https://api.weatherapi.com/v1/current.json?key=" + MICLAVE + "&q=" + $("#localidad").val() + " ES&aqi=yes&lang=es") // Utilizamos fetch para hacer nuestra consulta a la Api. En la propia URL incluimos la clave proporcionada y la localidad que consultamos mediante un selector de JQuery. Añadimos también lang=es para que nos devuelva en castellano el mayor número de datos posible
        .then((result) => { // Primera fase del fetch, donde devolvemos el resultado exitoso de la consulta en formato legible (JSON)
          return result.json();
        })
        .then((datos_devueltos) => { // Segunda fase del fetch, recibimos el conjunto de datos en la variable datos_devueltos

          let tipoLluvia = ""; // Declaramos esta variable auxiliar para operar con ella más adelante
          let direccionViento = ""; // Declaramos esta variable auxiliar para operar con ella más adelante

          let hoy = new Date(); // Creamos un nuevo objeto Date para definir la fecha de hoy

          $("#tiempoHoy").removeClass("previsionFallida"); // Le quitamos a nuestro div la clase previsionFallida. Esto lo hacemos porque si nuestra consulta es errónea al principio (donde le añadiríamos esta clase para dotarla de un formato acorde) y luego la corregimos, se queda con el formato de error. Hay que quitarle esta clase si la tiene y luego añadirle la suya.
          $("#tiempoHoy").addClass("previsionActual"); // Le añadimos la clase establecida en nuestro CSS para el día de hoy

          /* Nombre de la localización consultada */
          $("#tiempoHoy").html("<h2>" + datos_devueltos.location.name + "</h2><hr/>");

          /* Día actual de la consulta */
          $("#tiempoHoy").append("<h2> " + hoy.toLocaleDateString("ES", opciones) + "</h2><hr/>");

          /* Región y país de la localización consultada */
          $("#tiempoHoy").append("<strong>" + datos_devueltos.location.region + "</strong>, <strong>" + datos_devueltos.location.country + "</strong>.<hr/><br/>");

          /* Temperatura actual de la localización consultada */
          $("#tiempoHoy").append("La temperatura actual es de <strong>" + datos_devueltos.current.temp_c + "Cº</strong><br/><br/>");

          /* Velocidad y tipo de viento */
          switch (datos_devueltos.current.wind_dir) { // Como el dato de la dirección del viento se nos facilita como una abreviatura, le damos un formato mejor mediante un switch
            case "N":
              direccionViento = "norte";
              break;
            case "W":
              direccionViento = "oeste";
              break;
            case "E":
              direccionViento = "este";
              break;
            case "S":
              direccionViento = "sur";
              break;
            case "NE":
              direccionViento = "noreste";
              break;
            case "NW":
              direccionViento = "noroeste";
              break;
            case "SE":
              direccionViento = "sudeste";
              break;
            case "SW":
              direccionViento = "suroeste";
              break;
            default:
              direccionViento = datos_devueltos.current.wind_dir;
          }

          if (datos_devueltos.current.wind_kph > 1) { // Si la velocidad del viento supera el kilómetro por hora, consideramos que hace viento, e informamos de esa velocidad al usuario, así como de la dirección que tiene
            $("#tiempoHoy").append("El viento es de <strong>" + datos_devueltos.current.wind_kph + " Km/h</strong>, en dirección <strong>" + direccionViento + "</strong>. <br/> <br/>");
          } else { // Si la velocidad del viento no supera el kilómetro por hora, consideramos que hay calma
            $("#tiempoHoy").append("<strong>No hay viento</strong> en estos momentos. <br/> <br/>");
          }

          /* Tipo de clima e icono */
          $("#tiempoHoy").append("Hoy el tiempo es <strong>" + datos_devueltos.current.condition.text + "</strong>.<br/><img src='" + datos_devueltos.current.condition.icon + "'/><br/>"); // Mostramos el tipo de tiempo y el icono correspondiente

          /* Cantidad y tipo de lluvia */
          if (datos_devueltos.current.precip_mm > 0.1) { // Si la cantidad de precipitación es superior a 0.1mm, consideramos que está lloviendo. 

            if (datos_devueltos.current.precip_mm <= 2) { // En función de la cantidad de mm de precipitación, determinamos un tipo de lluvia para informar de ello al usuario
              tipoLluvia = "débiles";
            } else if (datos_devueltos.current.precip_mm > 2 && datos_devueltos.current.precip_mm <= 15) {
              tipoLluvia = "moderadas";
            } else if (datos_devueltos.current.precip_mm > 15 && datos_devueltos.current.precip_mm <= 30) {
              tipoLluvia = "fuertes";
            } else if (datos_devueltos.current.precip_mm > 30 && datos_devueltos.current.precip_mm <= 60) {
              tipoLluvia = "muy fuertes";
            } else if (datos_devueltos.current.precip_mm > 60) {
              tipoLluvia = "torrenciales";
            }

            $("#tiempoHoy").append("En estos momentos <strong>está lloviendo</strong>. Las precipitaciones son de <strong>" + datos_devueltos.current.precip_mm + " mm</strong>, con lo que se tratan de <strong>lluvias " + tipoLluvia + "</strong>.<br/><br/>"); // Informamos al usuario de la cantidad y tipo de las precipitaciones
          } else { // Si la cantidad de precipitación es menor o igual a 0.1mm, entendemos que no está lloviendo
            $("#tiempoHoy").append("En estos momentos <strong>no está lloviendo</strong>.<br/><br/>");
          }

          /* Calidad del aire */
          $("#tiempoHoy").append("<hr/><br/><span class=textoIzquierda>Indice de calidad del aire: <ul><li>Partículas de monóxido de carbono (CO): <strong>" + datos_devueltos.current.air_quality.co + "</strong></li><li>Partículas de dióxido de nitrógeno (NO2): <strong>" + datos_devueltos.current.air_quality.no2 + "</strong></li><li>Partículas de ozono (O3): <strong>" + datos_devueltos.current.air_quality.o3 + "</strong></li><li>Partículas de dióxido de azufre (SO2): <strong>" + datos_devueltos.current.air_quality.so2 + "</strong></li></ul></span>"); // Mostramos varias partículas indicativas de la calidad del aire en forma de lista (añadimos mediante un span una clase para alinear todo este texto a la izquierda)

        })
        .catch((error) => { // Fase de captura de errores del fetch
          $("#tiempoHoy").addClass("previsionFallida"); // Si la solicitud no se realiza con éxito, aplicamos una clase para que se entienda que es un mensaje erróneo
          $("#tiempoHoy").html("<h2>Error al consultar el tiempo de hoy:<br/><br/>" + error + "</h2>"); // Informamos del error al usuario
        })
        .finally(console.warn(`La consulta ha finalizado`)); // Finally para indicar que la consulta ha finalizado por consola
    });

  });

  /* CONSULTA MEDIANTE JQUERY AJAX A WEATHER API (Tres días) */

  $(function () { // Esperamos a que se cargue la página
    /* Función que se dispara al hacer click en nuestro botón para ver la previsión del tiempo de tres días a partir de hoy */
    $("#tiempoFuturo").click(function () {

      $("#tiempoTresDias").html("<img src='imagenes/ajax-loader.gif'>"); // Cargamos en el html el ajax-loader

      $.ajax({
        url: "http://api.weatherapi.com/v1/forecast.json?key=" + MICLAVE + "&q=" + $("#localidad").val() + " ES&days=4&aqi=yes&alerts=yes&lang=es", // Indicamos la url a la que realizaremos la consulta para los tres próximos días, montándola de una forma similar con nuestra clave y la localidad que pasamos por el input
        type: "GET", // Indicamos el método de solicitud
        dataType: "json", // Indicamos el tipo de dato
        async: true, // Indicamos que sea asíncrona
        success: function (datos_devueltos) { // Si tiene éxito, procedemos a realizar las siguientes operaciones:

          let fecha; // Declaramos una variable para atribuirle la fecha más adelante

          /* Añadimos al CSS del div superior los siguientes atributos para que, en el momento en que entre este objeto en él, el resto se dispongan en fila, para una mejor visualización y evitar en la medida de lo posible el scroll vertical */
          $("#paneles").css('display', 'flex');
          $("#paneles").css('flex-direction', 'row');

          $("#tiempoTresDias").removeClass("previsionFallida"); // De la misma forma que con la previsión del día actual, le quitamos a nuestro div la clase previsionFallida. Esto lo hacemos porque si nuestra consulta es errónea al principio (donde le añadiríamos esta clase para dotarla de un formato acorde) y luego la corregimos, se queda con el formato de error. Hay que quitarle esta clase si la tiene y luego añadirle la suya.
          $("#tiempoTresDias").addClass("previsionFutura"); // Le añadimos la clase establecida en nuestro CSS para la previsión de los tres días

          /* Nombre de la localización consultada */
          $("#tiempoTresDias").html("<h2>" + datos_devueltos.location.name + "</h2><hr/>");

          /* Región y país de la localización consultada */
          $("#tiempoTresDias").append("<strong>" + datos_devueltos.location.region + "</strong>, <strong>" + datos_devueltos.location.country + "</strong>");

          $("#tiempoTresDias").append("<div class=contenedorDia>"); // Añadimos un div llamado contenedor Dia donde iremos separando los diferentes días a consultar

          /* Recorremos el array de datos devueltos */
          for (let prediccion in datos_devueltos.forecast.forecastday) {
            if (prediccion > 0) { // Para que no nos dé la información del día actual, ya que ya la hemos recogido en la consulta anterior, comenzamos a recoger datos a partir de la siguiente posición
              fecha = new Date(datos_devueltos.forecast.forecastday[prediccion].date); // Creamos un nuevo objeto Date con los datos de la fecha de cada día

              $(".contenedorDia").append("<hr/>"); // Añadimos una línea de separación

              /* Mostramos el día que se consulta */
              $(".contenedorDia").append("<h2> " + fecha.toLocaleDateString("ES", opciones) + "</h2><br/>");

              /* Primer conjunto de datos, para las 5:00 AM */
              $(".contenedorDia").append("A las 5:00:</h3><br/>");
              $(".contenedorDia").append("<img src='" + datos_devueltos.forecast.forecastday[prediccion].hour[5].condition.icon + "'/><br/>"); // Mostramos el icono correspondiente al tiempo de ese momento
              $(".contenedorDia").append("Se prevee un tiempo <strong>" + datos_devueltos.forecast.forecastday[prediccion].hour[5].condition.text + "</strong> para ese día sobre esa hora.<br/>"); // Mostramos el tiempo previsto para esa hora
              $(".contenedorDia").append("Temperatura prevista: <strong>" + datos_devueltos.forecast.forecastday[prediccion].hour[5].temp_c + "Cº</strong>.<br/><br/>"); // Mostramos la temperatura prevista para esa hora

              /* Segundo conjunto de datos, para las 14:00 PM */
              $(".contenedorDia").append("A las 14:00:</h3><br/>");
              $(".contenedorDia").append("<img src='" + datos_devueltos.forecast.forecastday[prediccion].hour[14].condition.icon + "'/><br/>"); // Mostramos el icono correspondiente al tiempo de ese momento
              $(".contenedorDia").append("Se prevee un tiempo <strong>" + datos_devueltos.forecast.forecastday[prediccion].hour[14].condition.text + "</strong> para ese día sobre esa hora.<br/>"); // Mostramos el tiempo previsto para esa hora
              $(".contenedorDia").append("Temperatura prevista: <strong>" + datos_devueltos.forecast.forecastday[prediccion].hour[14].temp_c + "Cº</strong>.<br/><br/>"); // Mostramos la temperatura prevista para esa hora

              /* Hora de salida y puesta del sol */
              $(".contenedorDia").append("Ese día, el sol saldrá en torno a las <strong>" + datos_devueltos.forecast.forecastday[prediccion].astro.sunrise + "</strong> de la mañana y se pondrá sobre las <strong>" + datos_devueltos.forecast.forecastday[prediccion].astro.sunset + "</strong> tarde.<br/><br/>");

            }
          }

          $("#tiempoTresDias").append("</div>"); // Al terminar las iteraciones, cerramos el div contenedorDia

          /* Comprobación de las alertas */
          if (datos_devueltos.alerts.alert.length > 0) { // Si hay alertas en el array devuelto, llevamos a cabo las siguientes acciones

            $("#tiempoTresDias").append("<hr/> <span id=alertas>Alertas vigentes: </span>"); // Mostramos el apartado de alertas

            /* Añadimos atributos al css del span para darle un formato más llamativo */
            $("#alertas").css('color', 'rgb(255, 20, 20)');
            $("#alertas").css('text-decoration', 'underline');
            $("#alertas").css('font-weight', 'bold');

            /* Mostramos en forma de lista todas las alertas vigentes */
            $("#tiempoTresDias").append("<ul>"); // Abrimos la lista
            for (let alerta in datos_devueltos.alerts.alert) { // A veces las alertas son la misma, pero si devolvemos sólo la primera nos arriesgamos a que haya diferentes alertas para un mismo sitio y no se muestren todas
              $("#tiempoTresDias").append("<span class=textoIzquierda><li><strong>" + datos_devueltos.alerts.alert[alerta].headline + "</strong>. " + datos_devueltos.alerts.alert[alerta].instruction + "</li></span><br/>"); // Mostramos la alerta y las recomendaciones a seguir
            }
            $("#tiempoTresDias").append("</ul>"); // Cerramos la lista

          } else { // Si no hay alertas en el array, añadimos atributos al css del span para mandar el mensaje con un estilo acorde e informamos al usuario

            $("#tiempoTresDias").append("<hr/> <span id=alertas>No hay alertas vigentes.</span>");
            $("#alertas").css('color', 'rgb(0, 143, 12)'); // 
            $("#alertas").css('font-weight', 'bold');

          }

        },
        error: function (xhr, estado, error_producido) { // Si la solicitud falla, llevamos a cabo las siguientes operaciones
          $("#tiempoTresDias").addClass("previsionFallida"); // Aplicamos una clase para que se entienda que es un mensaje erróneo
          $("#tiempoTresDias").html("<h2>Error al consultar la previsión del tiempo para los tres próximos días:<br/><br/>" + error_producido + "</h2>"); // Informamos del error al usuario

        },
        complete: function (xhr, estado) { // Tanto si falla como si funciona, informamos mediante un mensaje por consola de que la solicitud se ha completado
          console.log("Petición completa");
        }

      });

    });
  });

  /* CONSULTA MEDIANTE AXIOS A GEODB */

  $(function () { // Esperamos a que se cargue la página
    /* Función que se dispara al hacer click en nuestro botón para ver la localización en un mapa del lugar que hemos indicado en el input*/
    $("#geolocalizacion").click(function () {

      let datos_devueltos; // Declaramos una variable para almacenar los datos que obtendremos de la API 

      $("#mapa").remove(); // Al hacer click, eliminamos el div para resetear el "lienzo" de nuestro mapa si ya existía alguno (Si no hacemos esto, Leaflet te dice que ya hay un mapa cargado cada vez que cambiamos de localización o volvemos a pulsar el botón sin cambiar de lugar)
      $("#mapaGeolocalizacion").append("<div id='mapa'></div>"); // Añadimos un nuevo div con id='mapa'
      $("#mapa").html("<img src='imagenes/ajax-loader.gif'>"); // // Cargamos en el html el ajax-loader

      axios({
        method: "get", // Indicamos el método de solicitud
        url: "http://geodb-free-service.wirefreethought.com/v1/geo/places", // Indicamos la URL a la que realizaremos la consulta
        params: { limit: '5', offset: '0', types: 'CITY', namePrefix: $("#localidad").val(), languageCode: 'es' } // Le pasamos los parámetros necesarios, donde añadimos el valor de nuestro input (en namePrefix)
      }).then(function (response) { // Almacenamos en una variable la respuesta a la solicitud efectuada

        datos_devueltos = response.data; // Almacenamos en nuestra variable datos_devueltos los datos almacenados en la respuesta

        if (datos_devueltos.data.length === 0) { // Si no hay datos, llevamos a cabo las siguientes acciones:

          $("#mapa").html("¡No podemos situar esta localidad!"); // Informamos al usuario de que no podemos situarlo en el mapa añadiendo un mensaje al div

          /* Atribuimos una serie de estilos al CSS del div para que el mensaje sea visible y estético */
          $("#mapa").css('display', 'flex');
          $("#mapa").css('flex-direction', 'column');
          $("#mapa").css('text-align', 'center');
          $("#mapa").css('justify-content', 'center');

        } else { // Si hay datos, procedemos a dibujar nuestro mapa dentro del div

          $("#mapa").remove(); // Eliminamos el div para resetear el "lienzo" de nuestro mapa si ya existía alguno (Si no hacemos esto, Leaflet te dice que ya hay un mapa cargado cada vez que cambiamos de localización o volvemos a pulsar el botón sin cambiar de lugar)
          $("#mapaGeolocalizacion").append("<div id='mapa'></div>"); // Añadimos un nuevo div con id='mapa'

          /* Declaramos una variable para la latitud y otra para la longitud, para atribuirles más adelante los datos rescatados de la API */
          let latitud;
          let longitud;

          /* Añadimos al CSS del div superior los siguientes atributos para que, en el momento en que entre este objeto en él, el resto se dispongan en fila, para una mejor visualización y evitar en la medida de lo posible el scroll vertical */
          $("#paneles").css('display', 'flex');
          $("#paneles").css('flex-direction', 'row');

          /* Recorremos el array de datos devueltos */
          for (let localidad in datos_devueltos.data) {
            if (datos_devueltos.data[localidad].countryCode === 'ES' && datos_devueltos.data[localidad].name === $("#localidad").val()) { // Para afinar la búsqueda, rescatamos la latitud y la longitud sólo si encontramos el código de país ES y el nombre de la localización es el mismo que hemos pasado por el input

              latitud = datos_devueltos.data[localidad].latitude;
              longitud = datos_devueltos.data[localidad].longitude;
            }

          }

          /* Configuración del mapa mediante Leaflet */

          let mapa = L.map('mapa').setView([latitud, longitud], 15); // Definimos un mapa y establecemos la latitud y la longitud de nuestra localización, así como el zoom inicial

          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // Cargamos en nuestro mapa la capa de teselas (que es como funcionan los mapas web) desde el servidor de openstreetmap
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapa);

          /* Personalización del icono del marcador (for fun) */
          miMarcador = L.icon({
            iconUrl: 'imagenes/mario.png',
            iconSize: [40, 40],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          });

          let marcadorMario = L.marker([latitud, longitud], { icon: miMarcador }).addTo(mapa) // añadimos al mapa el marcador en la latitud y longitud establecida, así como el estilo personalizado que hemos creado
          .bindPopup('¡Haz click en Mario para saber qué tiempo hace hoy! Wahooo!.') // Personalizamos el mensaje del popUp
          .openPopup();

          /* Añadimos una función de click a nuestro marcador */
          $(marcadorMario).click(function () {

            $("#tiempoActual").click(); // Al hacer click en el marcador, activamos la función de click que muestra el tiempo del día actual

          });

          /* NOTA:
           * COMENTAR desde la personalización del icono del marcador hasta esta línea y
           * DESCOMENTAR las líneas DEBAJO DE ESTE COMENTARIO si se quiere utilizar un marcador NO
           * personalizado
           */

          /* let marcadorPredeterminado = L.marker([latitud, longitud]).addTo(mapa)
            .bindPopup('¡Haz click en el marcador para saber qué tiempo hace hoy!')
            .openPopup();

          $(marcadorPredeterminado).click(function () {
            $("#tiempoActual").click();
          }); */

        }
      });
    });
  });
}