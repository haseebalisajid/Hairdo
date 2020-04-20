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

//Fecthing data from database
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("saloons");
let count=1;
usersRef.once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = "";
        snapshot.forEach(function (data) {
            var user = data.val();
            if (user.Status == 'unActive') {
                console.log(data.val(), "value");
                content += '<tr>';
                content += '<td>' + count + '</td>';
                content += '<td>' + user.firstName + " " + user.lastName + '</td>';
                content += '<td>' + user.saloonName + '</td>';
                content += '<td>' + user.email + '</td>';
                content += '<td>' + user.dateOfBirth + '</td>';
                content += '<td>' + user.address + '</td>';
                content += '<td>' + user.Status + '</td>';
                count++;
            }

        });
        $('#tt2').append(content);
        console.log(content, "content");

    }
});

function logout() {
    let str = window.localStorage;
    str.removeItem("email");
    str.removeItem("password");
    firebase.auth().signOut();
    firebase.auth().signOut();
    window.location.href = "http://127.0.0.1:5500/front.html";
}
function comingSoon(){
    alert("This function is not available at the moment");
}