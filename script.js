//declaración de variables

let arrayPreguntas = [];
    let arrayRespuestasIncorrectas = [];
    let arrayRespuestasCorrectas = [];
let respuestasUsuario = [];
let templateArray = [];
let counter = 0;
let questionNumber = 0;

//fetch de la api + llamada a la función para pintar las preguntas y opciones
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

    pintarPreguntas(0);
    } catch (error) {
      console.error(error);
    }
    }

//template string para pintar las preguntas y opciones en required + innerHTML
async function pintarPreguntas(i) {
  let template = `
  <legend id="pregunta">${arrayPreguntas[i]}</legend>
    
    <input type="radio" class="answer" id="respuesta1" name="opcionesRespuesta" value='${arrayRespuestasCorrectas[i]}' required>
    <label for="respuesta1">${arrayRespuestasCorrectas[i]}</label>
  
    
    <input type="radio" class="answer" id="respuesta2" name="opcionesRespuesta" value='${arrayRespuestasIncorrectas[i][0]}' required>
    <label for="respuesta2">${arrayRespuestasIncorrectas[i][0]}</label>
    
    
    <input type="radio" class="answer" id="respuesta3" name="opcionesRespuesta" value='${arrayRespuestasIncorrectas[i][1]}' required>
    <label for="respuesta3">${arrayRespuestasIncorrectas[i][1]}</label>
    
    
    <input type="radio" class="answer" id="respuesta4" name="opcionesRespuesta" value='${arrayRespuestasIncorrectas[i][2]}' required>
    <label for="respuesta4">${arrayRespuestasIncorrectas[i][2]}</label>
    
    <button type='submit' id="siguientePregunta"></button>`;
  document.getElementById("seccionPregunta").innerHTML = template;
  }

//función que se hace sólo se hace si se está en la página questions para setear en local storage, pasar las preguntas y pasar a la página de resultados

if (window.location.pathname == "/pages/questions.html") {
  getQuestionAndAnswers();  

  document
    .getElementById("formulario")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      questionNumber++;
      respuestasUsuario.push(event.target.opcionesRespuesta.value);
      localStorage.setItem("respuestasUsuario", JSON.stringify(respuestasUsuario));
      localStorage.setItem("arrayRespuestasCorrectas", JSON.stringify(arrayRespuestasCorrectas))
      console.log(respuestasUsuario);
      if (questionNumber == 10) {
        window.open("./results.html", "_self");
      }
      pintarPreguntas(questionNumber);
    });
}

//función que sólo se hace si se está en la página de results, recuperar datos de local storage para compararlos, sumar al counter e imprimir por consola el resultado

if (window.location.pathname == "/pages/results.html") {
let respuestasUsuario = JSON.parse(localStorage.getItem("respuestasUsuario"));
let arrayRespuestasCorrectas = JSON.parse(localStorage.getItem("arrayRespuestasCorrectas"))
for (let i = 0; i < respuestasUsuario.length; i++) {
  console.log(respuestasUsuario[i], arrayRespuestasCorrectas[i]);
  if (respuestasUsuario[i] == arrayRespuestasCorrectas[i]) {
    counter++
  } 
    }
    let results = `Tu puntaje es de ${counter} sobre 10`
    document.getElementById("results").innerHTML = results;
}