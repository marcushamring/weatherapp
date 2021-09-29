let btn = document.querySelector('.button')
let detailsbtn = document.querySelector('.details')
let inputValue = document.querySelector('.inputValue')
let city = document.querySelector('.city')
let desc = document.querySelector('.desc')
let temp = document.querySelector('.temp')
let dt = document.querySelector('.dt')
inputValue.defaultValue='gävle'


// const apiKey = 'b35e37918b9548b89ac7b237fca37292'
let url =`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=b35e37918b9548b89ac7b237fca37292`

//Collecting information about Gävle
fetch('https://api.openweathermap.org/data/2.5/weather?q=gävle&appid=b35e37918b9548b89ac7b237fca37292')
    .then(response =>{
    return response.json();
    }).then(data =>{
    console.log(data)
    let cityValue = data.name;
    let tempValue = data.main.temp;
    tempValue=tempValue-273.15;
    let descValue = data.weather[0].description;
    let dtValue = data.dt;
    //Converting unix time to Readable format
    dtValue=dtValue*1000     
    let dateObject = new Date(dtValue)
    let dateFormated = dateObject.toLocaleString();
    
    // Saving values from array into html
    city.innerHTML = cityValue;
    temp.innerHTML = `${tempValue.toFixed(1)} \u00B0C`;
    desc.innerHTML = descValue;
    dt.innerHTML = dateFormated;
    
    let descSymbol = data.weather[0].id
    console.log(descSymbol)
    //Changing background image depending on Weather
//     if (descSymbol>800) {
//             document.body.style.backgroundImage = 'url(https://i.redd.it/ykkbu29d6nb61.jpg)'
//     } else if (descSymbol===800){
//             document.body.style.backgroundImage = 'url(https://news.in-24.com/temp/resized/medium_2021-05-11-8c01f7b7ae.jpg)'
//     }else if(descSymbol>200){
//             document.body.style.backgroundImage='url(https://mrsmindfulness-wpengine.netdna-ssl.com/wp-content/uploads/2015/06/876588-rain-wallpaper.gif)'
//     }

    }).catch(err =>{
    console.log(err)
})

//search for specific results
btn.addEventListener('click', function (){
        detailsbtn.disabled=false;
        let inputValue = document.querySelector('.inputValue')

        inputValue=inputValue.value;
    console.log(inputValue)
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=b35e37918b9548b89ac7b237fca37292`
    
    
    fetch(url)
    .then(response =>{
    return response.json();
    }).then(data =>{
    console.log(data)
    let cityValue = data.name;
    let tempValue = data.main.temp;
    tempValue=tempValue-273.15;
    let descValue = data.weather[0].description;
    let dtValue = data.dt;
    //Converting unix time to Readable format
    dtValue=dtValue*1000     
    let dateObject = new Date(dtValue)
    const dateFormated = dateObject.toLocaleString();
    
    city.innerHTML = cityValue;
    temp.innerHTML = `${tempValue.toFixed(1)} \u00B0C`;
    desc.innerHTML = descValue;
    dt.innerHTML = dateFormated;

    //empty previous details
        document.querySelector('.forecast').innerHTML=''
    
    let descSymbol = data.weather[0].id
    console.log(descSymbol)
    //Changing background image depending on Weather
//     if (descSymbol>800) {
//             document.body.style.backgroundImage = 'url(https://media.istockphoto.com/photos/storm-sky-rain-picture-id512218646?k=20&m=512218646&s=612x612&w=0&h=C-2Gn8nsMG-o7QNiXYPqu4FeJJFABhPpe4rTG0CIMWQ=)'
//     } else if (descSymbol===800){
//             document.body.style.backgroundImage = 'url(https://news.in-24.com/temp/resized/medium_2021-05-11-8c01f7b7ae.jpg)'
//     }else if(descSymbol>200){
//             document.body.style.backgroundImage='url(https://mrsmindfulness-wpengine.netdna-ssl.com/wp-content/uploads/2015/06/876588-rain-wallpaper.gif)'
//     }

    }).catch(err =>{
    console.log(err)

})
})

detailsbtn.addEventListener('click', myDetailedSearch);


function myDetailedSearch(){
        inputValue=document.querySelector('.inputValue')
        inputValue=inputValue.value;
        urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=b35e37918b9548b89ac7b237fca37292`
        fetch(urlForecast)
        .then(response =>{
                return response.json();
        }).then(data =>{
                const myArray = data.list;
                console.log(data);
                const noonWeather = []
                const noonMaxTemp = []
                const noonMinTemp= []
                const noonWxInfo = []
                for (let i = 0; i < myArray.length; i++) {
                        
                        const element = myArray[i].dt_txt;
                        let tempmax =myArray[i].main.temp_max
                        tempmax = tempmax-273.15;;
                        let tempmin =myArray[i].main.temp_min
                        tempmin = tempmin - 273.17;
                        const wxinfo = myArray[i].weather[0].description; 
                        //console.log(element)
                        
                        noonWeather.push(element)
                        noonMaxTemp.push(tempmax)
                        noonMinTemp.push(tempmin)
                        noonWxInfo.push(wxinfo)
                        //selecting todays cloest forecast and then the 4 consecutive days
                        if (i%8===0) {
                                let dateElement = document.createElement('p');
                                dateElement.innerHTML = `Date: ${noonWeather[i]}`
                                let forecastdiv = document.querySelector('.forecast')
                                forecastdiv.appendChild(dateElement);
                                
                                let max_Element = document.createElement('p');
                                max_Element.innerHTML = `Max temp: ${noonMaxTemp[i].toFixed(2)} \u00B0C`
                                forecastdiv.appendChild(max_Element);

                                let min_Element = document.createElement('p');
                                min_Element.innerHTML = `Min temp: ${noonMinTemp[i].toFixed(2)} \u00B0C`
                                forecastdiv.appendChild(min_Element);

                                let wx_Element = document.createElement('p');
                                wx_Element.innerHTML = `General condition: ${noonWxInfo[i]}`
                                forecastdiv.appendChild(wx_Element);
                                let margin = document.createElement('hr')
                                forecastdiv.appendChild(margin)
                                
                                console.log(noonWeather[i])
                                console.log(noonMaxTemp[i])
                                console.log(noonMinTemp[i]) 
                                console.log(noonWxInfo[i])      
                        }

                }

        })
detailsbtn.disabled=true;
}
