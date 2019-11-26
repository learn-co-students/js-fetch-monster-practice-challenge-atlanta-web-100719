window.addEventListener('DOMContentLoaded', function (e) {

    const bbutton = document.querySelector('#back');
    const fbutton = document.querySelector('#forward');
    const baseURL = 'http://localhost:3000/monsters/';
    const form = document.querySelector('#monster-form');

    let page = 1;

    bbutton.addEventListener('click', function (e) {
        page = page > 1 ? --page : 1;
        fetchMonsters();
    });

    fbutton.addEventListener('click', function (e) {
        page++;
        fetchMonsters();
    });

    form.addEventListener('submit', createMonster);

    function fetchMonsters() {
        console.log(page);
        fetch(baseURL + `?_limit=50&_page=${page}`)
            .then(res => res.json())
            .then(showMonsters)

    }

    function showMonsters(monsters) {
        const monsterDiv = document.querySelector('#monster-container');
        const newMonsterDiv = document.createElement('div');
        newMonsterDiv.id = 'monster-container';
        for (const monster of monsters) {
            newMonsterDiv.appendChild(constructDiv(monster));
        }
        monsterDiv.parentNode.replaceChild(newMonsterDiv, monsterDiv);
    }

    function constructDiv(monster) {
        const h2 = document.createElement('h2');
        h2.innerText = monster.name;
        const h3 = document.createElement('h3');
        h3.innerText = monster.age;
        const p = document.createElement('p');
        p.innerText = monster.description;

        const div = document.createElement('div');
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(p);
        return div;
    }

    function createMonster(event) {
        event.preventDefault();
        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                age: Number.parseFloat(event.target.age.value),
                description: event.target.description.value
            })
        })
            .then(res => res.json())
            .then(monster => {
                const monsterDiv = document.querySelector('#monster-container');
                monsterDiv.appendChild(constructDiv(monster));
            })

        event.target.reset();

    }

    fetchMonsters();

});