import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { db } from "../../private/js/firebaseSettings.js";
import { newToken } from "../../private/js/generateToken.js";
import { getIp } from "../../private/js/ip.js";

document.getElementById("submit").addEventListener('click', (e)=>{
  document.getElementById("password").style.border = "none";
  document.getElementById("username").style.border = "none";
  const dbRef = ref(db);
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  get(child(dbRef, `users/${username}`)).then(async (snapshot) => {

    // Jeżeli użytkownik istnieje w bazie
    if (snapshot.exists()) {

      // Sprawdź hasło
      if(snapshot.val().password == password){

        //wygeneruj nowy token użytkownika
        var token = await newToken(username);
        
        //przypisz token do adresu IP
        set(ref(db, `ips/Id_${Object.keys(get(child(dbRef, `ips/`))).length})`), {
          ip: await getIp(),
          token: token
        });

        //wprowadź token do użytkownika
        set(ref(db, `users/${username}/token`), token);

        window.location.href = "index.html";
      }else{
        document.getElementById("password").style.border = "calc(.1vh + .1vw) solid red";
      }
    } else {
      document.getElementById("username").style.border = "calc(.1vh + .1vw) solid red";
    }
  }).catch((error) => {
    console.error(error);
  });
});

