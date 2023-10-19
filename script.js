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

async function getQuestions() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple");
      
      if (!response.ok) {
        throw new Error("Error al obtener los datos. Código de estado: " + response.status);
      }
      
      const data = await response.json();
      const questions = data.results;
      
      questions.forEach(question => {
        console.log(question.question);
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  getQuestions();

  document.getElementById("pregunta1").