const container = document.querySelector(".mainContainer");
const button = document.getElementById("searchbtn");
const cityNameIn = document.getElementById("cityNameIn")

const fetchWeather = async (url)=>{
    container.innerHTML="";
    container.innerHTML=`<div class="loader"></div>`;
    let res = await fetch(url);
    let data = await res.json();
    if(!res.ok){
        const error = document.createElement("p");
        error.classList.add("error");
        error.innerText="Oh! It seems Something Went Wrong";
        container.innerHTML="";
        container.appendChild(error);
    }else{
        container.innerHTML="";
        displayWeather(data);
    }
}

button.addEventListener("click",()=>{
    if(!cityNameIn.value){
        cityNameIn.setCustomValidity("Please Enter City Name");
        cityNameIn.reportValidity();
    }else{
        cityNameIn.setCustomValidity("");
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameIn.value}&APPID=4ad3618f79c2fb8181d8e22c1a023ef5`)
        
    }
})

function displayWeather(data){
    const secondaryBox = document.createElement("div");
    const cityHeader = document.createElement("div");
    const cityWeather = document.createElement("div");
    const cityName = document.createElement("h1");
    const country = document.createElement('h3');
    const temperature = document.createElement("span");
    const humidity = document.createElement("span");
    const feelsLike = document.createElement("span");
    const description = document.createElement("span");
    const iconBox = document.createElement("div");
    const icon = document.createElement("img");
    
    cityHeader.classList.add("cityHeader");
    cityWeather.classList.add("cityWeather");

    temperature.className="temperature";
    humidity.className="humidity";
    feelsLike.className='feelsLike';
    description.className="description";
    iconBox.className="iconBox";
    secondaryBox.className="secondaryBox";

    cityName.innerText = data.name;
    country.innerText = data.sys.country;
    temperature.innerText=`Temperature : ${Math.floor(data.main.temp)-273} \u00B0 C`;
    feelsLike.innerText=`Feels Like : ${Math.floor(data.main.feels_like)-273} \u00B0 C`;
    description.innerText = `${data.weather[0].description}`;
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    icon.setAttribute("placeholder","Icon");
    humidity.innerText=`Humidity : ${data.main.humidity}%`;

    cityHeader.appendChild(cityName);
    cityHeader.appendChild(country);
    cityWeather.appendChild(iconBox);
    iconBox.appendChild(icon);
    iconBox.appendChild(description);
    cityWeather.appendChild(temperature);
    cityWeather.appendChild(feelsLike);
    cityWeather.appendChild(humidity);
    secondaryBox.appendChild(cityHeader);
    secondaryBox.appendChild(cityWeather);
    container.appendChild(secondaryBox);
}