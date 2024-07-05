// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsEqGxxYPwhke45DcexAnO-rxxUu8G3gM",
    authDomain: "win-officials-login.firebaseapp.com",
    projectId: "win-officials-login",
    storageBucket: "win-officials-login.appspot.com",
    messagingSenderId: "771961855913",
    appId: "1:771961855913:web:35c89a8fe4228f165aeeb8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

window.login = function(e) {
    e.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then(function(userCredential) {
        // Signed in
        var user = userCredential.user;
        alert("Login successfull !!");
        // Redirect or perform other actions upon successful login
        window.location.href = "main.html";
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error: Invalid Login !! ");
    });
};
