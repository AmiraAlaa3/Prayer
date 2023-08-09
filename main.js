const cities = [
    { name: "Minūfīyah", arabicname: "المنوفية" },
    { name: "DK", arabicname: "الدقهلية" },
    { name: "Gharbīyah", arabicname: "الغربية" },
    { name: "c", arabicname: "القاهرة" },
    { name: "FYM", arabicname: "الفيوم" }
];

const selectElement = document.getElementById("custom-select");
const addressElement = document.getElementById("address");

for (let city of cities) {
    const option = document.createElement("option");
    option.textContent = city.arabicname;
    selectElement.appendChild(option);
}

document.addEventListener("change", function (event) {
    if (event.target.id === "custom-select") {
        const selectedValue = event.target.value;
        addressElement.innerHTML = selectedValue;
        let cityName = "";
        for (let city of cities) {
            if (city.arabicname === selectedValue) {
                cityName = city.name;
            }
        }
        getPrayerByTime(cityName);
    }
});

function getPrayerByTime(cityName) {
       let params = {
        country : "EG",
        city : cityName
    }
    axios.get("https://api.aladhan.com/v1/timingsByCity",
     {
        params:params
    })
    .then((resolve) => {
        const timing =resolve.data.data.timings;

        const date =resolve.data.data.date.readable;
        const weekday =resolve.data.data.date.hijri.weekday.ar;
    
        addDate(date,weekday);
        
        getPrayerByName("Fajr" ,timing.Fajr);
        getPrayerByName("Sunrise" ,timing.Sunrise);
        getPrayerByName("Dhuhr" ,timing.Dhuhr);
        getPrayerByName("Asr" ,timing.Asr);
        getPrayerByName("Maghrib" ,timing.Maghrib);
        getPrayerByName("Isha" ,timing.Isha);

    })
}

function getPrayerByName(id, time) {
    document.getElementById(id).innerHTML = time;
}

function addDate(date, weekday) {
    document.getElementById("year").innerHTML = date;
    document.getElementById("day").innerHTML = weekday;
}

// Initialize with a default city
getPrayerByTime("Minūfīyah");
