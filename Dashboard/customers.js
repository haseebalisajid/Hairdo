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
let arr = [];
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let storage = window.localStorage;
let saloonName = storage.getItem("saloonName");
document.getElementById("SLname").innerHTML = saloonName;
console.log("salon name in dashboard", saloonName);
let firstName = storage.getItem("firstName");
document.getElementById("RName").innerHTML = firstName;
var col = document.getElementById("pending");

function change(id, name, color) {
    document.getElementById(id).innerHTML = name;
    document.getElementById(id).style.backgroundColor = color;
    return;
}
//Fecthing data from database
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("customers");
let count=1;
usersRef.once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = "";
        snapshot.forEach(function (data) {
            var user = data.val();
            if (user.Status == 'Done') {
                console.log(data.val(), "value");
                content += '<tr>';
                content += '<td>' + count + '</td>';
                content += '<td>' + user.firstName + " " + user.lastName + '</td>';
                content += '<td>' + user.email + '</td>';
                content += '<td>' + user.category + '</td>';
                content += '<td>' + user.Date + '</td>';
                content += '<td>' + user.Status + '</td>';
                count++;
            }

        });
        $('#tt4').append(content);
        console.log(content, "content");

    }
});

function logout() {
    firebase.auth().signOut();
    storage.removeItem("uid");
    storage.removeItem("email");
    storage.removeItem("saloonName");
    storage.removeItem("firstName");
    window.location.href = "http://127.0.0.1:5500/front.html";
}

function comingSoon(){
    alert("This function is not available at the moment");
}
