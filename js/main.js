"use strict";var template=document.querySelector("#eventtemp").content,eventlist=document.querySelector("#eventlist"),page=1,lookingForData=!1,catLink="http://scaredmonkey.dk/cms/wp/wp-json/wp/v2/categories",aside=document.querySelector("aside"),mytimer=setInterval(myTimer,5e3);function fetchData(){lookingForData=!0,fetch("http://scaredmonkey.dk/cms/wp/wp-json/wp/v2/events?_embed&per_page=75&page="+page).then(function(b){return b.json()}).then(showContent)}function showContent(b){console.log(b),lookingForData=!1,b.forEach(showEvent)}function showEvent(b){if("ClemensMMD"===b._embedded.author[0].name){var c=template.cloneNode(!0);c.querySelector("h1").textContent=b.title.rendered,c.querySelector(".price span").textContent=b.acf.price,c.querySelector(".category").textContent=b.acf.event_type,c.querySelector(".venue").textContent="Location: "+b.acf.location,c.querySelector(".date").textContent="Date: "+b.acf.date;var d=b.acf.date;c.querySelector(".date").textContent="Date: "+d.substring(0,4)+"/"+d.substring(4,6)+"/"+d.substring(6,8);var f=b.acf.time;c.querySelector(".time").textContent="Time: "+f.substring(0,2)+":"+f.substring(2,4),c.querySelector("img").setAttribute("src",b._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url),c.querySelector(".readmore").href="subpage.html?id="+b.id,console.log(b.acf.event_type),c.querySelector(".event").classList.add(b.acf.event_type),eventlist.appendChild(c)}else;}fetchData(),setInterval(function(){bottomVisible()&&!1==lookingForData&&(console.log("Getting More Events"),page++,fetchData())},100);function bottomVisible(){var b=window.scrollY,c=document.documentElement.clientHeight,d=document.documentElement.scrollHeight;return c+b>=d||d<c}fetch(catLink).then(function(b){return b.json()}).then(function(b){return sort(b)});function sort(b){b.forEach(function(c){var d=document.createElement("a");d.href="#",d.textContent=c.name,d.classList.add("menu_item"),d.addEventListener("click",function(){return filter(c)}),aside.appendChild(d)})}function filter(b){document.querySelectorAll(".event").forEach(function(c){c.classList.add("hidden"),c.classList.contains(b.slug)?(console.log("i have a class called "+b.slug),c.classList.remove("hidden")):console.log("i DONT have a class called "+b.slug)})}function burger(b){b.classList.toggle("change")}document.querySelector(".burger").addEventListener("click",trae_menu);function trae_menu(){document.querySelector("aside").classList.toggle("traeMenu")}function myTimer(){document.querySelector(".loader").style.display="none"}
