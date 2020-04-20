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
const email = document.getElementById("email");
const password = document.getElementById("password");
const saloonName = document.getElementById("saloon");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const dob = document.getElementById("dateOfBirth");
const address = document.getElementById("address");
const signUp = document.getElementById("signUpBtn");

let storage = window.localStorage;
signUp.addEventListener("click", e => {
    const userEmail = email.value;
    const userPassword = password.value;
    const userSaloonName = saloonName.value;
    const userFirstName = firstName.value;
    const userLastName = lastName.value;
    const userDOB = dob.value;

    const userAddress = address.value;
    const userStatus="Active";
    storage.setItem("firstName",userFirstName);
    storage.setItem("saloonName",userSaloonName);
    console.log(userEmail, userPassword);
    const auth = firebase.auth(); 
    const promise = auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then(function (event) {
            let ref = firebase.database().ref("saloons/").child(event.user.uid).set({
                email: userEmail,
                saloonName: userSaloonName,
                firstName: userFirstName,
                lastName: userLastName,
                dateOfBirth: userDOB,
                address: userAddress,
                Status: userStatus,
                uid:event.user.uid
            }).catch(e => console.log("error", e.message));
            window.location.href =
      "http://127.0.0.1:5500/Dashboard/dashboard.html";
        });
});
































