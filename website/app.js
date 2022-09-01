/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&APPID=08272dcc27429c169845d350fb468dd8&units=imperial'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();

const getData = async (url = '') => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const parsedResponse = response.json();
        return parsedResponse;
    } catch (error) {
        console.log("error", error);
    }
}

const getApiData = async (url = '') => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        return new Promise((res,rej)=>{res(data)});
    } catch (error) {
        console.log("error", error);
    }
}

//add event listener to the generate button
const button = document.getElementById('generate');
button.addEventListener('click', generate);

async function generate() {
    const zip = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    const apiData = await getApiData(baseURL + zip + apiKey);
    let temp = 0;
    try {
        temp = apiData.main.temp;  
    } catch (error) {
        document.getElementById('temp').innerHTML = "Faild to get the temperature. Connection error or wrong zip code";
        console.log("error", error);
        return;
    }
    console.log(temp);
    const data = {
        temperature: temp,
        date: newDate,
        userResponse: userFeeling
    }

    postData('/feeling', data);
    updateUI()
}

async function updateUI() {
    const request = await fetch('/all');
    try {
    const parsedRequest = await request.json()
    // update UI elements
    document.getElementById('date').innerHTML ='Date: '+ parsedRequest.date;
    document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(parsedRequest.temperature)+ ' degrees';
    document.getElementById('content').innerHTML = 'Feelings: ' + parsedRequest.userResponse;
    }
    catch(error) {
      console.log('error', error);
    }    
}
