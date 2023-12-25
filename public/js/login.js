import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { db } from "../../private/js/firebaseSettings.js";
import { newToken } from "../../private/js/generateToken.js";

document.getElementById("submit").addEventListener('click', (e)=>{
  document.getElementById("password").style.border = "none";
  document.getElementById("username").style.border = "none";
  const dbRef = ref(db);
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  get(child(dbRef, `users/${username}`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      if(snapshot.val().password == password){
        var token = await newToken(username);

        set(ref(db, `ips/Id_${Object.keys(get(child(dbRef, `ips/`))).length})`), {
          ip: await getIp(),
          token: token
        });

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

async function getIp(){
  var adress = (await fetch('https://api.ipify.org')).text();
  return adress;
}