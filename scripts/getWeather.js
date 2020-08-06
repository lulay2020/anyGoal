window.addEventListener("load", ()=>{
	let long,
		lat;
	let tempDescription = document.getElementById("temp-description"),
		tempDegree = document.getElementById("temp-degree"),
		tempSection = document.getElementById("temp-section"),
		tempScale = document.getElementById("temp-scale"),
		tempIcon = document.getElementById("temp-icon");
	const proxy = `https://cors-anywhere.herokuapp.com/`;

	if(localStorage.getItem('longitude') == null && localStorage.getItem('latitude') == null){
		if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition(position =>{
					// get position longitude and latitude
					long = position.coords.longitude;
					lat = position.coords.latitude;

					localStorage.setItem("longitude", long);
					localStorage.setItem("latitude", lat);

					// to get API works set proxy
					const api = `${proxy}https://api.darksky.net/forecast/cd5f0fb8678b7429c270fb41929598be/${lat},${long}`;

					// fetch API data
					fetch(api)
					.then(response =>{
						return response.json();
					})
					.then(data=>{
						const { temperature, summary, icon } = data.currently;
						tempDegree.textContent = temperature;
						tempDescription.textContent = summary;

						let celsius = Math.floor((temperature - 32)*(5/9));

						setIcons(icon, tempIcon);

						tempSection.addEventListener("click", ()=>{
							if (tempScale.textContent==='F') {
								tempScale.textContent = 'C';
								tempDegree.textContent = celsius;
							}else{
								tempScale.textContent = "F";
								tempDegree.textContent= temperature;
							}
						})
					});
				});
			} else {
				tempSection.textContent = "Can not get weather status";
			}
	} else {
		let lat = localStorage.getItem("latitude");
		let long = localStorage.getItem("longitude")
		const api = `${proxy}https://api.darksky.net/forecast/cd5f0fb8678b7429c270fb41929598be/${lat},${long}`;

		// fetch API data
		fetch(api)
		.then(response =>{
			return response.json();
		})
		.then(data=>{
			const { temperature, summary, icon } = data.currently;
			let celsius = Math.floor((temperature - 32)*(5/9));

			tempDegree.textContent = celsius;
			tempDescription.textContent = summary;

			setIcons(icon, tempIcon);

			tempSection.addEventListener("click", ()=>{
				if (tempScale.textContent==='C') {
					tempScale.textContent = 'F';
					tempDegree.textContent = temperature;
				}else{
					tempScale.textContent = "C";
					tempDegree.textContent= celsius;
				}
			})
		});
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color:'white'});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon])
	}

});