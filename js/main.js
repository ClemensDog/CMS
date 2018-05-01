let template = document.querySelector("#eventtemp").content;
let eventlist = document.querySelector("#eventlist")
let page = 1;
let lookingForData = false;
let catLink = "http://scaredmonkey.dk/cms/wp/wp-json/wp/v2/categories";
const aside = document.querySelector('aside');


function fetchData() {
    lookingForData = true;
    fetch("http://scaredmonkey.dk/cms/wp/wp-json/wp/v2/events?_embed&per_page=75&page=" + page)
        .then(e => e.json())
        .then(showContent)
}

function showContent(data) {
    console.log(data);
    lookingForData = false;
    data.forEach(showEvent)
}

function showEvent(anEvent) {
    if (anEvent._embedded.author[0].name === "ClemensMMD") {
        //console.log(anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        let clone = template.cloneNode(true);
        clone.querySelector("h1").textContent = anEvent.title.rendered;
        clone.querySelector(".price span").textContent = anEvent.acf.price;
        clone.querySelector(".category").textContent = anEvent.acf.event_type;
        clone.querySelector(".venue").textContent = "Location: " + anEvent.acf.location;
        clone.querySelector(".date").textContent = "Date: " + anEvent.acf.date;
        clone.querySelector(".time").textContent = "Time: " + anEvent.acf.time;
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        clone.querySelector('.readmore').href = "subpage.html?id=" + anEvent.id;
        console.log(anEvent.acf.event_type);
        clone.querySelector(".event").classList.add(anEvent.acf.event_type);
        eventlist.appendChild(clone);
    } else {

    }

}

fetchData();

setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("Getting More Events")
        page++;
        fetchData();
    }
}, 100)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}

fetch(catLink).then(result => result.json()).then(cats => sort(cats));

function sort(cats) {
    cats.forEach(cat => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = cat.name;
        a.classList.add("menu_item");
        a.addEventListener('click', () => filter(cat));
        aside.appendChild(a);
    })
}

function filter(category) {

    document.querySelectorAll(".event").forEach(el => {
        el.classList.add("hidden");
        if (el.classList.contains(category.slug)) {
            console.log("i have a class called " + category.slug)
            el.classList.remove("hidden")
        } else {
            console.log("i DONT have a class called " + category.slug)
        }
    })

}


function burger(x) {
    x.classList.toggle("change");
}


document.querySelector(".burger").addEventListener('click', trae_menu);

function trae_menu() {
    document.querySelector("aside").classList.toggle("traeMenu");
}
