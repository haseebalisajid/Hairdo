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
let database=firebase.database();
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const category = document.getElementById("category");
const date = document.getElementById("date");
const signUp = document.getElementById("signUpBtn");

function show(){
    console.log("Data was submitted");
}

signUp.addEventListener("click", e => {
    console.log("event",e);
    const userFirstName = firstName.value;
    const userLastName = lastName.value;
    const userEmail = email.value;
    const userPassword = password.value;
    const userCategory = category.value;
    const Status = "PENDING";
    const userDate=date.value;
    const auth=firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(userEmail, userPassword)
        .then(function (event) {
            console.log("event2", event);
            let ref = firebase.database().ref("customers/").child(event.user.uid).set({
                email: userEmail,
                firstName: userFirstName,
                lastName: userLastName,
                Date: userDate,
                category: userCategory,
                Status: Status,
                uid:event.user.uid
            }).catch(e => console.log("error", e.message));
        });
});

