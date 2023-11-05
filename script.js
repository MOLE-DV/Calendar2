// window.addEventListener('load', ()=>{
//     let add = 1;
//     for(i = 0; i < 24 * 8; i++){
//         let box = document.createElement('div');
//         box.setAttribute('id', 'box');
//         if(i == add-1){
//             box.innerText = Math.floor(i/8) + ':00';
//             box.setAttribute('class', 'time');
//             add+=8;
//         }
//         document.getElementById('dat').appendChild(box);
//     }
// })

let ms = []
let hght = 0;
let offset = 0
let date_index = undefined
let date = new Date();

let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

setInterval(Update, 1000);

function Update(){
    date = new Date();
}

window.onload = function(){
    hght = (document.getElementById('d_right').clientHeight / 24);
    offset = document.getElementById('d_right').offsetTop;
}

addEventListener('mousemove', (e)=>{
    const line = document.getElementById('line');
    ms = [e.pageX, e.pageY];

    switch(e.target.parentElement.getAttribute('id') == 'd_right'){
        case true:        
            document.getElementById('scr').style.display = 'block';
            line.style.display = 'block';
            
            let element_scroll = e.pageY - offset;
            let start_el = e.target.offsetTop - offset
            let end_el = e.target.clientHeight + start_el;
            let calculation = Math.abs(Math.round(59 * (element_scroll - start_el) / (end_el - start_el).toFixed(1)));

            if(calculation < 10){
                calculation = '0' + calculation.toString();
            }
        
            document.getElementById('scr').innerHTML = (element_scroll / (document.getElementById('d_right').clientHeight / 24)).toString().split('.')[0] + ':' + calculation
        
            document.getElementById('scr').style.top = e.pageY + 'px';
            document.getElementById('scr').style.left = e.pageX + 30 + 'px';

            line.style.top = e.pageY + 'px';
            break;
        case false:
            document.getElementById('scr').style.display = 'none';
            line.style.display = 'none';
            break;
    }
})


addEventListener('keydown', (k)=>{
    if(k.key == 'e'){
        console.log(hght);
        document.getElementById('task').style.top = offset + hght * 2 + 'px';
    }
})

let last = undefined

function zip_change(ziper, box){
    const selector = document.getElementById('selector');
    if(last != undefined) last.style.color = 'black';
    box.style.color = 'white';
    date_index = ((Array.prototype.slice.call(ziper.children).indexOf(box)) - 1);

    selector.style.marginLeft = 'calc((16vw / 4) * ' + date_index + ')';

    const top = document.getElementById('day');
    const right = document.getElementById('d_right');
    console.log(date.getDay());
    switch(date_index){
        case 0:
            top.innerHTML = '<div id="box" class="new_task">+</div><div id="single">'+ day_names[date.getDay()] +'</div>';
            right.innerHTML = `<div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div>
            `;
            break;
        case 1:
            top.innerHTML = `
            <div id="box" class="new_task">+</div>
            <div id="box">Monday</div>
            <div id="box">Tuesday</div>
            <div id="box">Wednsday</div>
            <div id="box">Thursday</div>
            <div id="box">Friday</div>
            <div id="box">Saturday</div>
            <div id="box">Sunday</div>`;
            right.innerHTML = `<div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div>`;
            break;
    }

    last = box;
}