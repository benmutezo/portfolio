//Henter elementene fra HTML
const slettAlt = document.querySelector("#clear")
const datoFremvisning = document.querySelector("#date");
let gjortKnapp = document.querySelector("#done");

const innTastFelt = document.querySelector("#input")
const leggTil = document.querySelector(".addToDo");
//først viser jeg datoen
const inst = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
const dt = new Date();
datoFremvisning.innerHTML = dt.toLocaleDateString("no", inst)

//funksjon for å liste opp hva som skal gjøres

const loggfør = (toDo) => {
    if (toDo) {
        listItem()
    }
    innTastFelt.value = "";
}

const evaluateToDO = () => {
    loggfør(innTastFelt)

}

const slett = (i) => {
    const slettKnapp = document.querySelectorAll(".delete");
    const slett = i =>
        i.forEach(item =>
            item.addEventListener("click", () => item.parentElement.parentElement.remove())
        )
    slett(slettKnapp)
}
slett()

let dataBase = []
let stored = localStorage.getItem("brukerListe");

if (stored) {
    let list = JSON.parse(stored)
    list.forEach(function (item) {
        listItemToView(item);
    });

} else {
    console.log("kk");

}

function listItemToView(i) {
    markup(i)
}
// window.onload=console.log(store)

console.log(localStorage);

function markup(notat) {
    const content = document.querySelector(".content")
    ul = document.createElement("ul")
    ul.innerHTML = `<li>
    <i class="material-icons done">check_circle_outline</i>
    <p class="p">${notat}</p>
    <i class="material-icons delete">delete_outline</i>
  </li>`;
    ul.classList.add("list")
    const input = content.appendChild(ul)
    const dl = input.getElementsByClassName("delete")[0];
    const dn = input.getElementsByClassName("done")[0];
    //fjern fra liste
    dl.onclick = i => slett()
    //fullført
    dn.onclick = i => ferdig()
};

function listItem() {
    //legg til liste
    const value = innTastFelt.value
    markup(value)
    dataBase.push(value)
    //Lagre lokalt
    localStorage.setItem("brukerListe", JSON.stringify(dataBase))
}

const ferdig = () => {
    const DONE = document.querySelectorAll(".done")
    const tag = document.querySelectorAll(".p")
    DONE.forEach((item, x) =>
        item.addEventListener("click", () => {
            tag[x].classList.toggle("linethrough")
            DONE[x].classList.toggle("green");
        })
    )
}

ferdig()
// Hendelse funksjoner
innTastFelt.addEventListener("keyup", e => e.key === "Enter" ? evaluateToDO() : false)

leggTil.addEventListener("click", evaluateToDO)

const refresh = () => {
    const oppdater = document.querySelector("#clear")
    oppdater.onclick = i => { location.reload(), localStorage.clear() }
}

refresh()