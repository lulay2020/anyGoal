const time = document.getElementById("time"),
	greeting = document.getElementById("greeting"),
	name = document.getElementById("name"),
	table = document.getElementById("list"),
	focus = document.getElementById("focus");

let tasks = JSON.parse(localStorage.getItem("tasks"));

function showTime(){
	// get the time now
	let today = new Date(),
		hour = today.getHours(),
		min = today.getMinutes();

	// set AM or PM depending on the hour
	const amPm = hour >= 12 ? 'PM' : 'AM';

	// change to 12 hour clock 
	hour = hour % 12 || 12

	// display time
	time.innerHTML = `${hour}:${addZero(min)} ${amPm}`;

	// call showTime function every second
	setTimeout(showTime, 1000);
}

function showDate(){
	let displayDate = document.querySelector("#date");
	let today = Date(),
		date = today.substr(0, 15);

	displayDate.textContent = date;
}

function addZero(n){
	// return hour with 0 before it if it is single digit
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBg(){
	let today = new Date(),
		hour = today.getHours(),
		question = document.getElementById("question"),
		tds = document.querySelectorAll("td"),
		th = document.querySelector("th"),
		hiddenDiv = document.querySelectorAll(".hidden-div");

	// according to hour change bg and greeting message as well as question

	if (hour < 12) {
		// Morning
		document.body.style.backgroundImage = "url('images/morning.jpg')";
		greeting.textContent = 'Good Morning,';
		// change style according to the background
		document.body.style.color = '#000';
		th.style.borderColor = '#000';
		for (let td of tds){
			td.style.borderColor = '#000';
		}
	} 
	else if(hour < 17){
		// Afternoon
		document.body.style.backgroundImage = "url('images/afternoon.jpg')";
		greeting.textContent = 'Good Afternoon,';
		document.body.style.color = '#000';
		th.style.borderColor = '#000';
		for (let td of tds){
			td.style.borderColor = '#000';
		}
	}
	else if(hour >= 17 && hour < 19){
		document.body.style.backgroundImage = "url('images/dusk.jpg')";
		greeting.textContent = 'Good Evening,';
	}

	else if(hour > 22){
		// Afternoon
		document.body.style.backgroundImage = "url('images/night-2.jpg')";
		question.textContent = "What are your planes?"
		greeting.textContent = 'Sleeping Zz';
		hiddenDiv.color = "#000";
	}	
	else{
		// Evening
		document.body.style.backgroundImage = "url('images/evening.jpg')";
		question.textContent = "Set plans for tomorrow:"
		greeting.textContent = 'Good Evening,';
		for(let div of hiddenDiv){
			div.style.color = "#000";

		}
	}
}

// get name
function getName(){
	// if name isn't in local storage
	if(localStorage.getItem('name') == null){
		// set name to ENTER NAME
		name.textContent = '[Enter Your Name]';
	} else {
		// set it to name text content
		name.textContent = localStorage.getItem('name');
	}
}

function setName(e){
	if(e.type === 'keypress'){
		// enter is pressed
		if(e.witch === 13 || e.keyCode == 13){
			localStorage.setItem('name', e.target.innerText)
			// blur cursor and don't go to next line
			name.blur()
		}
	} else {
		localStorage.setItem('name', e.target.innerText)
	}
}

function getFocus(){
	let content = `<tr><th>Tasks</th></tr>`
	if (localStorage.getItem('tasks') != null) {
		for (let task of tasks){
			content = content + `<tr><td><span><i class="fas fa-trash-alt"></i></span>${task}</td></tr>`;
		}		
	}
	table.innerHTML = content;
}

function setFocus(e){
	// enter is pressed
	if(e.witch === 13 || e.keyCode == 13){
		let task = e.target.innerText;
		if (tasks != null) {
			tasks.push(task);
		}else{
			tasks = [];
		}
		localStorage.setItem("tasks", JSON.stringify(tasks));
		focus.blur();
		getFocus();
		setBg()
	}
}

$("table").on("click", "span", function(event){
	// if trash span was clicked fade out parent element
	$(this).parent().fadeOut(500, function(){
		let a = tasks.indexOf(this.textContent);
		// remove from tasks array
		tasks.splice(a, 1);
		// set new array in local storage
		localStorage.setItem("tasks", JSON.stringify(tasks));
	})
})

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);

showTime();
showDate()
getName();
getFocus();
setBg();

