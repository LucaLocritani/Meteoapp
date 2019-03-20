document.addEventListener("DOMContentLoaded", () => {
    var lat = 41.9061698;
    var long = 12.494124300000001;
    // Handler when the DOM is fully loaded
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
        }, function () {
            console.log('errore geo');
        });
    } else {
        console.log('geo non disponibile');
    }

    /* La Fetch API fornisce un'interfaccia moderna per ottenere risorse */
    const url = 'https://api.apixu.com/v1/forecast.json?key=';
    const key = 'c5d52e8cf3bb4de39a5110546192202';
    var latlong = lat + ',' + long
    var requestURL = url + key + '&q=' + latlong;
    /*+'&q='+city*/

    const controller = new AbortController()
    const signal = controller.signal

    // per prima cosa ovviamente chiede l'url del nostro file json
    var getValue = () => fetch(requestURL, {
            signal
        })
        .then(response => response.json()) //qui avviene la risposta al server e viene trasferito in un file json
        .then(res => { //al quale possiamo accedere coi vari metodi da questa seconda parte
            console.log(res);
            loc = (res.location.tz_id);
            slashpos = loc.search("/")+1;
            locmod = loc.slice(slashpos);
            locdef = locmod.replace("_", " ");
            wet = (res.current.condition.icon);
            slashwet = wet.search("w");
            wetmod = wet.slice(slashwet);
            wetmod1 = wetmod.replace (".png",".svg");
            console.log (wetmod1);
            document.getElementById('currentCity').innerHTML = locdef;
            document.getElementById('tempCity').innerHTML = res.current.temp_c + ' °';
            document.getElementById('icon').src = wetmod1;
            console.log (document.getElementById('icon'));
            document.getElementById('humidity').innerHTML = res.current.humidity;
            document.getElementById('feelsLike').innerHTML = res.current.feelslike_c;
            /* per ciclare un array esiste il metodo .map (nomeArray.map (function(res){
            ... cosa deve far comparire ..
            })) */
        }).catch(err => { //in caso di errore stampamelo in console
            if (err.name === 'AbortError') {
                console.error('Fetch aborted')
            }
        })
    getValue();

});

var day;

switch (new Date().getDay()) {
    case 0:
        day = "Domenica";
        break;
    case 1:
        day = "Lunedì";
        break;
    case 2:
        day = "Martedì";
        break;
    case 3:
        day = "Mercoledì";
        break;
    case 4:
        day = "Giovedì";
        break;
    case 5:
        day = "Venerdì";
        break;
    case 6:
        day = "Sabato";
}

document.getElementById("giorno").innerHTML = day;

n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = d + "." + m + "." + y;
