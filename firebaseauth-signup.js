// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// import {
//   getFirestore,
//   setDoc,
//   doc,
// } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXVq14Z5dMumWhwo0V_Y-TOwEaa3ZTviU",
  authDomain: "cllg-622d4.firebaseapp.com",
  projectId: "cllg-622d4",
  storageBucket: "cllg-622d4.firebasestorage.app",
  messagingSenderId: "695814716804",
  appId: "1:695814716804:web:2d683df5cebdc5774231d1",
  measurementId: "G-Y1ZXF709H4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initailize firebase google sso
const provider = new GoogleAuthProvider();

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.endsWith(".edu");
}

document.addEventListener("DOMContentLoaded", () => {
  const signUp = document.getElementById("submitSignUp");
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("rEmail").value;
      const password = document.getElementById("rPassword").value;
      // const firstName = document.getElementById("fName").value;
      const conpass = document.getElementById("password").value;
      // const lastName = document.getElementById("lName").value;

      if (!validateEmail(email)) {
        alert("Please enter a valid email");
        return;
      }

      if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }

      if (password != conpass) {
        alert("Password does not match");
        return;
      }

      const auth = getAuth();
      // const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // const userData = {
          //   email: email,
          //   firstName: firstName,
          //   lastName: lastName,
          // };
          showMessage("Account Created Successfully", "signUpMessage");
          localStorage.setItem("loggedInUserId", user.uid);
          // const docRef = doc(db, "users", user.uid);
          // setDoc(docRef, userData)
          //   .then(() => {
          //     window.location.href = "index.html";
          //   })
          //   .catch((error) => {
          //     console.error("error writing document", error);
          //   });
          window.location.href = "profile edit page.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          alert(errorCode);
          if (errorCode == "auth/email-already-in-use") {
            showMessage("Email Address Already Exists !!!", "signUpMessage");
            window.location.href = "signin.html";
          } else {
            showMessage("unable to create User", "signUpMessage");
          }
        });
    });
  } else {
    console.error("Sign-up button not found.");
  }
  const signIngoogle = document.getElementById("submitSignIngoogle");
  signIngoogle.addEventListener("click", (event) => {
    event.preventDefault();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "profile edit page.html";
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        if (errorCode === "auth/invalid-credential") {
          alert("Incorrect Email or Password: " + errorMessage);
        }
      });
  });
});
