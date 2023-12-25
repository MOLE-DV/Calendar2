import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { db } from "../../private/js/firebaseSettings.js";

window.onload = ()=>{
    const dbRef = ref(db);
    const token = 
  
    get(child(dbRef, 'users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((val)=>{
          var userData = snapshot.val()[val];

          if(token == userData['token']){
            alert(`You are logged in as ${userData['username']} - ${userData['role']}`);
          }
        })
      }
    }).catch((error) => {
      console.error(error);
    });
}

async function getTokenFromIp(){
  var adress = (await fetch('https://api.ipify.org')).text();
  get(child(dbRef, 'ips/')).then((snapshot) => {
    
  }).catch((error) => {
    console.error(error);
  });
  return adress;
}