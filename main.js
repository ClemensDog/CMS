let template = document.querySelector("#eventtemp").content;
let eventlist = document.querySelector("#eventlist")
let page = 1;
let lookingForData = false;

function fetchData(){
    lookingForData=true;
    fetch("http://scaredmonkey.dk/cms/wp/wp-json/wp/v2/events?_embed&per_page=4&page="+page)
    .then(e => e.json())
    .then(showContent)
}

function showContent(data){
    console.log(data);
    lookingForData=false;
    data.forEach(showEvent)

}


function showEvent(anEvent){
    //console.log(anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    let clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".description").innerHTML = anEvent.content.rendered;
    clone.querySelector(".price span").textContent = anEvent.acf.price;

    if(anEvent._embedded["wp:featuredmedia"]){
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    }   else{
        clone.querySelector("img").remove()
    }
        eventlist.appendChild(clone);

}

fetchData();

setInterval(function(){

    if(bottomVisible() && lookingForData===false){
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
