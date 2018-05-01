let template = document.querySelector("#eventtemp").content;
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");


fetch("http://scaredmonkey.dk/cms/wp/wp-json/wp/v2/events/"+id)
    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(anEvent) {
    let clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".description").innerHTML = anEvent.content.rendered;
    clone.querySelector(".price span").textContent = anEvent.acf.price;
    clone.querySelector(".category").textContent = anEvent.acf.event_type;
    clone.querySelector(".venue").textContent = "Location: " + anEvent.acf.location;
    clone.querySelector(".date").textContent = "Date: " + anEvent.acf.date;
    clone.querySelector(".time").textContent = "Time: " + anEvent.acf.time;
    eventlist.appendChild(clone);

}


