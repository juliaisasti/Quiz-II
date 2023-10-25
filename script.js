// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdqKfg-MUYr8XaqjnTILiclMRASGsgYTs",
  authDomain: "quiz-ii-295bf.firebaseapp.com",
  projectId: "quiz-ii-295bf",
  storageBucket: "quiz-ii-295bf.appspot.com",
  messagingSenderId: "624153277504",
  appId: "1:624153277504:web:78e703c7beb304ba739ba5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Auth
const auth = getAuth();
const user = auth.currentUser;
//Initialize DDBB
const db = getFirestore(app);

//Selectores
const signUpForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logout = document.getElementById('logout');

//SignUp function
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const signUpEmail = document.getElementById('signup-email').value;
  const signUpPassword = document.getElementById('signup-pass').value;
  const signUpUser = document.getElementById('signup-user').value;
  const usersRef = collection(db, "users");
  let score = []

  try {
    //Create auth user
    await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      console.log('User registered')
      const user = userCredential.user;
      signUpForm.reset();
    })
    //Create document in DB
    await setDoc(doc(usersRef, signUpEmail), {
      username: signUpUser,
      email: signUpEmail,
      score})
  } catch (error) {
    console.log('Error: ', error)
  }
      
})

const registerBtn = document.querySelector("#registerBtn")
const loginBtn = document.querySelector("#loginBtn")
const signUpContainer = document.querySelector("#signup")
const loginContainer = document.querySelector("#login")

registerBtn.addEventListener('click', function(){
  signUpContainer.classList.toggle("hidden");
});

loginBtn.addEventListener('click', function(){
  loginContainer.classList.toggle("hidden");
});

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
    let results = `${counter}`+ `/10`
    document.getElementById("results").innerHTML = results;
}

// Función para obtener y mostrar los contactos desde Firestore
async function getUsers() {
  db.collection("formulario") // Reemplaza con tu nombre de colección
    .get()
    .then((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        contacts.push(userData);
      });
      //Aquí se llama a la función para guardar la info de los users(con users como parámetro);
    })
    .catch((error) => {
      console.error("Error al obtener los contactos:", error);
    });
}

// Llamar a la función para obtener y mostrar los contactos al cargar la página
// getUsers();

async function pintarGrafica() {
  // cambiar por URL de firebase cuando esté listo.
  const response = await fetch("../mocks/objetoPrueba.json");
  const json = await response.json();
  const users = json.users;
  console.log('users: ', users);
  let userIds = [];
  let userScores = [];
  users.forEach(user =>
  {
    userIds.push(user.id);
    userScores.push(user.puntuacion);
  });
  const chartData = {
    labels: userIds,
    series: [userScores],
  };
  const options = {
      axisY: {
          onlyInteger: true,
      }
  };
  new Chartist.Bar('#chart1', chartData, options);
                  
}
pintarGrafica();