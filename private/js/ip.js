async function getIp(){
    var adress = (await fetch('https://api.ipify.org')).text();
    return adress;
}

export {getIp}