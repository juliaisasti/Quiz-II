// async function getRandomQuestion() {
//     let random = Math.floor(Math.random() * 10)
//     let response = await fetch(`https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple/${random}`)
//     let pregunta = await response.json()
//     for (let index = 0; index < pregunta.results.length; index++) {
//         let preguntaRandom = pregunta.results[index].question
//         console.log(preguntaRandom);
//     }
//     return preguntaRandom
// }
let random = Math.floor(Math.random() * 10)
fetch(`https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple/${random}`)
.then(response=>console.log(response.json()));

