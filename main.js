const firebaseConfig = {
    apiKey: "AIzaSyDydNnGHYM7i_LIt6N4AjLpQjAxdVhsYnA",
    authDomain: "hairdo-862ac.firebaseapp.com",
    databaseURL: "https://hairdo-862ac.firebaseio.com",
    projectId: "hairdo-862ac",
    storageBucket: "hairdo-862ac.appspot.com",
    messagingSenderId: "301866122684",
    appId: "1:301866122684:web:cd560ca52bea9e088b3fb9",
    measurementId: "G-W96FS50KHX"
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

let storage = window.localStorage;
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");


loginBtn.addEventListener("click", e => {
    const userEmail = email.value;
    const userPassword = password.value;
    console.log(userEmail, userPassword);
    const auth = firebase.auth();
  
    const promise = auth.signInWithEmailAndPassword(userEmail, userPassword);
    promise.catch(e => console.log("error", e.message));

  });
  firebase.auth().onAuthStateChanged(async firebaseUser => {
    if (firebaseUser) {
      
      storage.setItem('uid', firebaseUser.uid);
      storage.setItem('email', firebaseUser.email);
      storage.setItem('firstName',firebaseUser.firstName);
      console.log(firebaseUser);
      await firebase.database().ref(`/saloons/${firebaseUser.uid}`).once('value').then(res => {
        console.log(res.val());
        let salon = res.val();
        storage.setItem('saloonName', salon.saloonName);
        storage.setItem('firstName',salon.firstName);
        return;

      });
      window.location.href =
      "http://127.0.0.1:5500/Dashboard/dashboard.html";
    } else {
      console.log("not logged in");
    }
  });