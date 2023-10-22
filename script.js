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
async function getQuestionAndAnswers() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple");
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos. Código de estado: " + response.status);
      }
  
      const data = await response.json();
      const questions = data.results;
  
      for (let i = 0; i < questions.length; i++) {
        arrayPreguntas.push(questions[i].question);
        console.log(arrayPreguntas);

        arrayRespuestasIncorrectas.push(questions[i].incorrect_answers);
        console.log(arrayRespuestasIncorrectas);

        arrayRespuestasCorrectas.push(questions[i].correct_answer);
        console.log(arrayRespuestasCorrectas);
      }
    } catch (error) {
      console.error(error);
    }
    let i =0;
    let template = `<legend id="pregunta">${arrayPreguntas[i]}</legend>
    <section>
    <label for="respuesta1">
    <input type="radio" id="respuesta1" name="opcionesRespuesta">
    ${arrayRespuestasCorrectas[i]}
    </label>
    <label for="respuesta2">
    <input type="radio" id="respuesta2" name="opcionesRespuesta">
    ${arrayRespuestasIncorrectas[i][0]}
    </label>
    <label for="respuesta3">
    <input type="radio" id="respuesta3" name="opcionesRespuesta">
    ${arrayRespuestasIncorrectas[i][1]}
    </label>
    <label for="respuesta4">
    <input type="radio" id="respuesta4" name="opcionesRespuesta">
    ${arrayRespuestasIncorrectas[i][2]}git push
    </label>
    </section>`
    document.getElementById("seccionPregunta").innerHTML += template
  }
  getQuestionAndAnswers();
  
  
 
  
  
  
  
  
  









  