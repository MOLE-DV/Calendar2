import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { db } from "../../private/js/firebaseSettings.js";
import { newToken } from "../../private/js/generateToken.js";

document.getElementById("login").addEventListener('submit', (e)=>{
    e.preventDefault();
    
    var form = document.getElementById("login");

    form.submit
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const dbRef = ref(db);

    get(child(dbRef, 'users')).then((snapshot) => {
      if (snapshot.exists()) {
        var data = snapshot.val();
          if(data[username] == undefined){    
            var token = newToken(username);   
            set(ref(db, 'users/' + username), {
                username: username,
                email: email,
                password: password,
                role: 'user',
                token: token
            });

            window.location.href = 'index.html';
          }else{
            alert("Already exist");
          }
      }
    }).catch((error) => {
      console.error(error);
    });
});