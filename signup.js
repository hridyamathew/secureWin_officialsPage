// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth=getAuth()
const database= getDatabase()

var name= document.getElementById("name")
var email= document.getElementById("email")
var department= document.getElementById("department")
var position= document.getElementById("position")
var district= document.getElementById("district")
var password= document.getElementById("password")

window.signup=function(e) {
    e.preventDefault();
    var obj= {
        name:name.value,
        email:email.value,
        department:department.value,
        position:position.value,
        district:district.value,
        password:password.value,
    }
    
createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(userCredential) {
        var user = userCredential.user;
        // Store user details in the database
        set(ref(database, 'users/' + user.uid), obj)
        .then(() => {
            alert("Sign Up Successful!!");
            window.location.href = "main.html"; // Redirect to login page
        })
        .catch((error) => {
            alert("Error storing user data: " + error.message);
        });
    })
    .catch(function(error) {
        if (error.code === "auth/email-already-in-use") {
            alert("Error: Email is already in use.");
        } else {
            alert("Error signing up: " + error.message);
        }
    });
};







