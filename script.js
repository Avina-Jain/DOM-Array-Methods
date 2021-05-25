const main = document.getElementById('main');
const addUserbtn = document.getElementById('add-user');
const doublebtn = document.getElementById('double');
const millionairesbtn = document.getElementById('show-millionaires');
const sortbtn = document.getElementById('sort');
const wealthbtn = document.getElementById('calculate-wealth');

let persons = [];

userGenerator();
userGenerator();

//fetch users and add wealth

async function userGenerator(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    };

    addData(newUser);
}

function addData(obj){
    persons.push(obj);

    updateDom();
}

// update main with users and wealth
function updateDom(providedUsers = persons){
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedUsers.forEach(person =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> $ ${person.money}.00`;
        main.appendChild(element);
    });
}

// double money

function doubleMoney(){
    persons = persons.map((person) => {
        return {...person, money: person.money*2 };
    });

    updateDom();
}

//sort by richest
function sortByRichest(){
    persons.sort((a,b)=> b.money - a.money);

    updateDom();
}

// filter and show millionaires

function showMillionaires(){
    persons = persons.filter((person) => person.money >=1000000);

    updateDom();
}

//calculate and display total wealth

function totalWealth(){

    const total = persons.reduce((acc, person) =>(acc+=person.money),0 );

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>$ ${total}.00</strong></h3>`;
    main.appendChild(wealthEl);


}

//event listeners

addUserbtn.addEventListener('click', userGenerator);
doublebtn.addEventListener('click', doubleMoney);
sortbtn.addEventListener('click', sortByRichest);
millionairesbtn.addEventListener('click', showMillionaires);
wealthbtn.addEventListener('click', totalWealth);

