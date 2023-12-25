import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { db } from "../../private/js/firebaseSettings.js";
import { newToken } from "../../private/js/generateToken.js";
import { getIp } from "../../private/js/ip.js";

document.getElementById("submit").addEventListener('click', (e)=>{
    e.preventDefault();
    
    var form = document.getElementById("login");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const dbRef = ref(db);

    get(child(dbRef, `users/${username}`)).then(async (snapshot) => {

      //jeżeli nie istnieje
      if (!snapshot.exists()) {

          //wygeneruj nowy token
          var token = await newToken(username);

          //wprowadź użytkownika do bazy danych
          set(ref(db, `users/${username}`), {
              username: username,
              email: email,
              password: password,
              role: 'user',
              token: token
          });

          var Userip = await getIp();

          await get(child(dbRef, `ips`)).then(async (ipsSnapshot) =>{
            await Object.keys(ipsSnapshot.val()).forEach(async (ipId)=>{
              if(ipsSnapshot.val()[ipId]["ip"] == Userip)
              set(ref(db, `ips/${ipId}/token`), token);
            })
          })

          window.location.href = 'index.html';
      }
      else{
        alert("User already exitst");
      }
    }).catch((error) => {
      console.error(error);
    });
});