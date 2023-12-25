import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { db } from "../../private/js/firebaseSettings.js";
const dbRef = ref(db);

window.onload = async ()=>{
    const token = await getTokenFromIp();

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
  var token = 0;

  await get(child(dbRef, 'ips/')).then(async (snapshot) => {
    var data = snapshot.val();

    await Object.keys(data).forEach(async (ipElement)=>{
      if(await data[ipElement]["ip"] == await adress){
        token = data[ipElement]["token"];
      }
    })
  }).catch((error) => {
    console.error(error);
  });

  return token == undefined ? 0 : token;
}