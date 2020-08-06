let bentoBtn = document.getElementById("bento"),
	quickLinks = document.querySelector(".quick-links");

let addLinkForm = document.getElementById("add-link-form");

let linkName = document.getElementById("link-name");
let linksContainer = document.getElementById("links");
let submitBtn = document.getElementById("submit");
let addLinkBtn = document.getElementById("add-link");
let deleteBtn = document.getElementById("delete");

let links = localStorage.getItem('links');

submitBtn.addEventListener("click", ()=>{
	let newLinksArr = [linkName.value, link.value]
	if (links != null) {
		links.push(newLinksArr);
	} else {
		links = []
	}
	localStorage.setItem("links", JSON.stringify(links));
	addQuickLinks();
})

bentoBtn.addEventListener("click", ()=>{
	quickLinks.classList.toggle("display");
	if (localStorage.getItem('links') != null) {
		addQuickLinks();		
	}
})

addLinkBtn.addEventListener("click", ()=>{
	addLinkForm.classList.toggle("display");
})

$("#links").on("click", "#delete", function(event){
	// if X was clicked fade out parent element
	$(this).parent().fadeOut(500, function(){
		let a = links.indexOf(this.textContent);
		// remove from tasks array
		links.splice(a, 1);
		// set new array in local storage
		localStorage.setItem("links", JSON.stringify(links));
	})
})

// Add links to quick links div
function addQuickLinks(){
	let content = ``
	links = JSON.parse(localStorage.getItem("links"));
	for(let link of links){
		content = content + `<span class="link-container">
								<i class="fas fa-times" id="delete"></i>
								<a href=${link[1]}>
								${link[0]}
							</a>
							</span>`;
	}
	linksContainer.innerHTML = content;
}