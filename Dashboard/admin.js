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

  //Fecthing data from database
  function getCustomers() {
    const dbRef = firebase.database().ref();
    const usersRef = dbRef.child("saloons");
    let count  = 1;
     $('#tt2').empty();
    usersRef.once("value", function (snapshot) {
      if (snapshot.exists()) {
        var content = "";
        snapshot.forEach(function (data) {
          var user = data.val();
          console.log(user);
          if (user.Status == 'Active') {
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
    const dbRef = await firebase.database().ref(`saloons/${id}`).update({Status: 'unActive'});
    getCustomers();
  
  }
  function logout() {
    let str = window.localStorage;
    str.removeItem("email");
    str.removeItem("password");
    firebase.auth().signOut();

    window.location.href = "http://127.0.0.1:5500/front.html";
  }
  
  
  function fillUserData(user, count) {
    let content = '';
    content += '<tr>';
    content += '<td>' + count + '</td>';
    content += '<td>' + user.firstName + " " + user.lastName + '</td>';
    content += '<td>' + user.saloonName + '</td>';
    content += '<td>' + user.email + '</td>';
    content += '<td>' + user.dateOfBirth + '</td>';
    content += '<td>' + user.address + '</td>';
    content += '<td>'+ `<button id=${user.uid} class="btn btn-outline-dark change" >`+ 'Click' +'</button>' +'</td>';
    return content;
  }
  function comingSoon(){
    alert("This function is not available at the moment");
}