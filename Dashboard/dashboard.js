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
let storage = window.localStorage;
let saloonName = storage.getItem("saloonName");
document.getElementById("SLname").innerHTML = saloonName;
let firstName = storage.getItem("firstName");
document.getElementById("RName").innerHTML = firstName;



//Fecthing data from database
function getCustomers() {
  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child("customers");
  let count  = 1;
  $('#tt2').empty(); //clear table and refresh page
  usersRef.once("value", function (snapshot) {
    if (snapshot.exists()) {
      var content = "";
      snapshot.forEach(function (data) {
        var user = data.val();
        console.log(user);
        if (user.Status == 'PENDING') {
          content += fillUserData(user, count);
          count=count+1;   
        }
  
      });
      $('#tt2').append(content);
      attachListener();
    }
  
  });
}
getCustomers();


function attachListener() {
  document.querySelectorAll('.change').forEach(changeButton => {
    let id = changeButton.getAttribute('id');
    changeButton.addEventListener('click', (e) => {
      ChangeStatus(id);
    })
  });
}

async function ChangeStatus(id){
  const dbRef = await firebase.database().ref(`customers/${id}`).update({Status: 'Done'});
  getCustomers();

}
function logout() {
  firebase.auth().signOut();
  storage.removeItem("uid");
  storage.removeItem("email");
  storage.removeItem("saloonName");
  storage.removeItem("firstName");
  window.location.href = "http://127.0.0.1:5500/front.html";
}


function fillUserData(user, count) {
  let content = '';
  content += '<tr>';
  content += '<td>' + count + '</td>';
  content += '<td>' + user.firstName + " " + user.lastName + '</td>';
  content += '<td>' + user.email + '</td>';
  content += '<td>' + user.category + '</td>';
  content += '<td>' + user.Date + '</td>';
  content += '<td>' + user.Status + '</td>';
  content += '<td>'+ `<button id=${user.uid} class="btn btn-outline-dark change" >`+ 'Click' +'</button>' +'</td>';
  return content;
}

function comingSoon(){
  alert("This function is not available at the moment");
}