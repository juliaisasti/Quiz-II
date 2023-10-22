//PASOS A HACER:
//Conseguir las preguntas de dentro del objeto
//Pintar dentro de cada label, las pregunas traídas de forma random
//Conseguir las respuestas, tanto incorrectas, como la respuesta correcta
//Pintar las respuestas en los input

//PRUEBAS PARA IMPRIMIR QUESTIONS:
// async function getRandomPokemonImage() {
//     let random = Math.floor(Math.random() * 151)
//     let response = await fetch(`https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple`)
//     let pokemon = await response.json()
//     let img = pokemon.sprites.front_default
//     return img
// }

let arrayPreguntas = [];
let arrayRespuestasIncorrectas = [];
let arrayRespuestasCorrectas = [];
let respuestasTodas = [arrayRespuestasCorrectas, arrayRespuestasIncorrectas];
let respuestasUsuario = []
let counter = 0;

async function getQuestionAndAnswers() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple"
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos. Código de estado: " + response.status
      );
    }

    const data = await response.json();
    const questions = data.results;

    for (let i = 0; i < questions.length; i++) {
      arrayPreguntas.push(questions[i].question);

      arrayRespuestasIncorrectas.push(questions[i].incorrect_answers);

      arrayRespuestasCorrectas.push(questions[i].correct_answer);
    }
  } catch (error) {
    console.error(error);
  }
  let i = 0;
  let template = `
  <legend id="pregunta">${arrayPreguntas[i]}</legend>
    <label for="respuesta1">
    <input type="radio" id="respuesta1" name="opcionesRespuesta" value="correct">
    ${arrayRespuestasCorrectas[i]}
    </label>
    <label for="respuesta2">
    <input type="radio" id="respuesta2" name="opcionesRespuesta" value="incorrect">
    ${arrayRespuestasIncorrectas[i][0]}
    </label>
    <label for="respuesta3">
    <input type="radio" id="respuesta3" name="opcionesRespuesta" value="incorrect">
    ${arrayRespuestasIncorrectas[i][1]}
    </label>
    <label for="respuesta4">
    <input type="radio" id="respuesta4" name="opcionesRespuesta" value="incorrect">
    ${arrayRespuestasIncorrectas[i][2]}
    </label>`;
  document.getElementById("seccionPregunta").innerHTML += template;
}

getQuestionAndAnswers();

document.getElementById("formulario").addEventListener('submit', function(event) {
  event.preventDefault()
  respuestasUsuario.push(event.target.name.value)
  console.log(respuestasUsuario);
}
)

// for (let i = 0; i < respuestasTodas.length; i++) {
//   for (let j = 0; j < respuestasTodas[i].length; j++) {
//       if (respuestasTodas[i][j].checked) {
//           respuestasUsuario.push(respuestasTodas[i][j].value);
//       }
//   }
// }



// function hayPreguntaSinResponder() {
//   let hayPreguntaSinRespuesta = false;
//   for (let i = 0; i < array.length; i++) {
//     const element = array i];
    
//   }
// }




// function hayPreguntasSinResponder() {
//   let hayPreguntaSinRespuesta = false;
//   for (let index = 0; index < playQuiz.length; index++) {
//       const elementosDeLasRespuestas = document.getElementsByName("opcionesDel"+ (index + 1));
//       const respuestas = Array.from(elementosDeLasRespuestas);
//       let hayRespuestaMarcada = false;
//       for (let respuestasIndex = 0; respuestasIndex < respuestas.length; respuestasIndex++) {
//           const respuesta = respuestas[respuestasIndex];
//           if (respuesta.checked) {
//               hayRespuestaMarcada = true;
//           }
//       }
//       if (!hayRespuestaMarcada){
//           hayPreguntaSinRespuesta = true;
//       }
//   }
//   return hayPreguntaSinRespuesta;
// }

// function calcularPuntuacion() {
//   for (let index = 0; index < playQuiz.length; index++){
//       const radioButtonSeleccionado = document.querySelector("[name=opcionesDel"+(index+1)+"]:checked");
//       if (radioButtonSeleccionado.value === 'correct') {
//           contadorRespuestasCorrectas++;
//       }
//   }
//   alert("Tu puntuación es de... "+contadorRespuestasCorrectas+" / " + playQuiz.length)
//   contadorRespuestasCorrectas = 0
// }

// document.getElementById("formulario").addEventListener("submit", function (event) {
//   // Dentro del objeto "event" están todos los datos del formulario enviado
//   event.preventDefault(); // parar envío formulario

//   const hayPreguntaSinResponder = hayPreguntasSinResponder();
//   if (hayPreguntaSinResponder){
//       alert("UPS! Debes responder todas las preguntas para descubrir tu resultado.");
//       return; 
//   }
//   calcularPuntuacion();
// })