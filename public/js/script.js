let ms = []
let hght = 0;
let offset = 0
let date_index = undefined
let date = new Date();
let cmonth = date.getMonth();
let cyear = date.getFullYear();
let ap_year = cyear;
let pr_year = cyear;
let dropdown_open = false;

let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = {
    'Januray': 31,
    'February': 28,
    'March': 31,
    'April': 30,
    'May': 31,
    'June': 30,
    'July': 31,
    'August': 31,
    'September': 30,
    'October': 31,
    'November': 30,
    'December': 31,
}


//istance days of set set month

function istance_month_days(parent, month, year){
    let skip = new Date(year + "-" + (month + 1)).getDay()-1;
    if(skip == -1) skip = 6;
    console.log(skip);

    for(i = 0; i < skip; i++){
        let empty = document.createElement('div');
        empty.setAttribute('id', 'box');
        empty.setAttribute('class', 'month_days_empty');
        parent.appendChild(empty);
    }
    for(i = 0; i < months[Object.keys(months)[month]]; i++){
        let box = document.createElement('div');
        box.setAttribute('id', 'box');
        box.setAttribute('class', 'month_days');
        box.innerHTML = "<div id='day_id'>"+ (i + 1) +"</div>";
        parent.appendChild(box);
    }
}


//istance month selector

function istance_month_selector(year){
    const drop = document.getElementById('drop');
    switch(dropdown_open){
        case false:
            let mn_holder = document.createElement('div');
            for(i = 0; i <= 11; i++){
                let box = document.createElement('div');
                box.setAttribute('id', 'd_m');
                box.setAttribute('onclick', 'selector_handle_change('+ i +', '+ year +')')
                box.innerText = Object.keys(months)[i] + ' ' + year;
                if(i == cmonth){
                    box.setAttribute('class', 'current');
                }
                mn_holder.appendChild(box);
            }
            drop.appendChild(mn_holder);
            dropdown_open = true;
            Array.prototype.slice.call(mn_holder.children)[cmonth].scrollIntoView();
            break;
        case true: drop.innerHTML = ''; dropdown_open = false; return;
    }

}


function expand_on_scroll(option, year){
    switch(dropdown_open){
        case true:
            const drop = document.getElementById('drop');
            let mn_holder = document.createElement('div');
            for(i = 0; i <= 11; i++){
                let box = document.createElement('div');
                box.setAttribute('id', 'd_m');
                box.setAttribute('onclick', 'selector_handle_change('+ i +', '+ year +')')
                box.innerText = Object.keys(months)[i] + ' ' + year;
                mn_holder.appendChild(box);
            }

            switch(option){
                case 'append': drop.appendChild(mn_holder); break;
                case 'prepend': 
                    drop.prepend(mn_holder); 
                    Array.prototype.slice.call(mn_holder.children)[1].scrollIntoView();
                    break;
                default: return;
            }

            return;
        default: return;
    }
}

function selector_handle_change(month, year){
    document.getElementById('drop').innerHTML = ''; dropdown_open = false;
    selector_changemonth(month,year);
}

function selector_changemonth(month, year){
    document.getElementById('d_right').innerHTML = '';
    istance_month_days(document.getElementById('d_right'), month, year)
    cyear = year;
    cmonth = month;
    document.getElementById('dropdown').innerText = Object.keys(months)[month] + ' ' + year;
}



//Update time each second

setInterval(Update, 1000);
function Update(){
    date = new Date();

}


//Get height of box adequately to users screen size

window.onload = function(){
    istance_month_days(document.getElementById('d_right'), cmonth, cyear);
    hght = (document.getElementById('d_right').clientHeight / 24);
    offset = document.getElementById('d_right').offsetTop;

    //Day/Week/Month/Year selector set to first
    zip_change(document.getElementById('zipper'), Array.prototype.slice.call(document.getElementById('zipper').children)[1]);

    const drp = document.getElementById('drop')

    //month selector
    drp.addEventListener('scroll', (ev)=>{
        if(drp.scrollHeight - drp.scrollTop - drp.clientHeight <= 5)
        {
            ap_year++;
           expand_on_scroll('append', ap_year);
        }
        if(drp.scrollTop == 0){
            pr_year--;
            expand_on_scroll('prepend', pr_year);
        }
    })   
}


//Time visualizer + line signalizator on mouse move

addEventListener('mousemove', (e)=>{
    const line = document.getElementById('line');
    ms = [e.pageX, e.pageY];

    switch(e.target.parentElement.getAttribute('id') == 'd_right' && (![2,3].includes(date_index))){
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



let last = undefined


//change what view is displaying
function zip_change(ziper, box){
    const selector = document.getElementById('selector');
    if(last != undefined) last.style.color = 'black';
    box.style.color = 'white';
    date_index = ((Array.prototype.slice.call(ziper.children).indexOf(box)) - 1);
    last = box;
    selector.style.marginLeft = 'calc((16vw / 4) * ' + date_index + ')';

    const holder = document.getElementById('holder');
    const top = document.getElementById('day');
    document.getElementById('drop').innerHTML = ''; dropdown_open = false
    document.getElementById('g_day').style.display = 'none';

    switch(date_index){
        case 0:
            holder.innerHTML = `
            <div id="d_left"><div id="time"><div id="box" class="time">0:00</div><div id="box" class="time">1:00</div><div id="box" class="time">2:00</div><div id="box" class="time">3:00</div><div id="box" class="time">4:00</div><div id="box" class="time">5:00</div><div id="box" class="time">6:00</div><div id="box" class="time">7:00</div><div id="box" class="time">8:00</div><div id="box" class="time">9:00</div><div id="box" class="time">10:00</div><div id="box" class="time">11:00</div><div id="box" class="time">12:00</div><div id="box" class="time">13:00</div><div id="box" class="time">14:00</div><div id="box" class="time">15:00</div><div id="box" class="time">16:00</div><div id="box" class="time">17:00</div><div id="box" class="time">18:00</div><div id="box" class="time">19:00</div><div id="box" class="time">20:00</div><div id="box" class="time">21:00</div><div id="box" class="time">22:00</div><div id="box" class="time">23:00</div></div></div>
            <div id="d_right"><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div><div id="single_box"></div></div>`
            top.innerHTML = '<div id="box" class="new_task">+</div><div id="single">'+ day_names[date.getDay()] +'</div>';
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

            holder.innerHTML = `<div id="holder">
            <div id="d_left"><div id="time"><div id="box" class="time">0:00</div><div id="box" class="time">1:00</div><div id="box" class="time">2:00</div><div id="box" class="time">3:00</div><div id="box" class="time">4:00</div><div id="box" class="time">5:00</div><div id="box" class="time">6:00</div><div id="box" class="time">7:00</div><div id="box" class="time">8:00</div><div id="box" class="time">9:00</div><div id="box" class="time">10:00</div><div id="box" class="time">11:00</div><div id="box" class="time">12:00</div><div id="box" class="time">13:00</div><div id="box" class="time">14:00</div><div id="box" class="time">15:00</div><div id="box" class="time">16:00</div><div id="box" class="time">17:00</div><div id="box" class="time">18:00</div><div id="box" class="time">19:00</div><div id="box" class="time">20:00</div><div id="box" class="time">21:00</div><div id="box" class="time">22:00</div><div id="box" class="time">23:00</div></div></div>
            <div id="d_right"><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div><div id="box"></div></div>
        </div>`;
            break;
            
            case 2:
                document.getElementById('g_day').style.display = 'flex';
                top.innerHTML = ` <div id="box" class="new_task">+</div>
                <div id="month_holder">
                    <div class="dropbutton" onclick="click_Handler(this.parentElement, this)"><</div>
                    <div id="dropdown" class="dropbutton" onclick="click_Handler(this.parentElement, this)">`+ Object.keys(months)[cmonth] + ` `+ cyear + `</div>
                    <div class="dropbutton" onclick="click_Handler(this.parentElement, this)">></div>
                </div>
                </div>`;

                holder.innerHTML = `                        
                <div id="d_right" style='padding-top: calc(1.5vh + 1.5vw);'>
                    
                </div>`;
                istance_month_days(document.getElementById('d_right'), cmonth, cyear);
            break;
            default: return;
    }

}





//Click Handler

function click_Handler(parent, element){
    switch(parent.getAttribute('id')){
        case 'month_holder':
            change_month(parent, element);
            break;
    }
}



//month_changer


function change_month(block,button){
    ap_year = cyear;
    pr_year = cyear;

    switch(Array.prototype.indexOf.call(block.children, button)){
        case 0: 
            document.getElementById('drop').innerHTML = ''; dropdown_open = false;
            if(!(cmonth < 1)){
                cmonth--; 
            }else { cmonth = 11; cyear--; }
            break;
        case 1:
            istance_month_selector(cyear);
            break;
        case 2: 
            document.getElementById('drop').innerHTML = ''; dropdown_open = false;
            if(!(cmonth > 10)){
                cmonth++; 
            }else { cmonth = 0; cyear++; }
            break;
        default: return;
    }
    document.getElementById('d_right').innerHTML = '';
    istance_month_days(document.getElementById('d_right'), cmonth, cyear);
    block.children[1].innerText = Object.keys(months)[cmonth] + ' ' + cyear;

}


//addTask


let tasks = [];

function viewTaskCreator(){
    document.getElementById("taskCreator").setAttribute("class", "forward");
}

function hideTaskCreator(Twindow){
    Twindow.setAttribute("class", "reverse");
}

function addTask(){
    let name = document.getElementById("taskCreator_Name").value;
    let desc = document.getElementById("taskCreator_Desc").value;
    let date = document.getElementById("taskCreator_Date").value;
    let startTime = document.getElementById("taskCreator_startTime").value;
    let endTime = document.getElementById("taskCreator_endTime").value;

    let tsk = new task(name, startTime, endTime, date, desc);
    tsk.add();
    tsk.viewAll();
}

class task{
    constructor(name, startTime, endTime, date, description){
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.description = description;
    }

    add(){
        tasks[this.name] = {
            startTime : this.startTime,
            endTime : this.endTime,
            date : this.date,
            description : this.description
        }
    }

    viewAll(){
        console.log(tasks);
    }
}