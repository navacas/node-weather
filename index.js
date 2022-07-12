import 'dotenv/config';

import { inquirerMenu, listPlaces, pause, readInput } from "./helpers/inquirer.js";
import Searching from "./models/search.js";




const main = async() =>{

    const search = new Searching();
    let opt;
    
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Show message
                const searchCity = await readInput('City: ');
                
                
                // Search the places
                const places = await search.city(searchCity);

                // Select the place
                const idSelected = await listPlaces(places);

                if (idSelected === '0') continue;

                const placeSelected = places.find( l => l.id === idSelected);

                 // record on db

                 search.addSearchRecord( placeSelected.name);
                

                // Weather data of the place selected
                const weather = await search.weatherPlace(placeSelected.lat, placeSelected.lng);
                

                // Show results
                console.clear();
                console.log('\nCity information: \n'.green);
                console.log('City: ', placeSelected.name.green);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperature: ', weather.temp);
                console.log('Minimum: ', weather.min);
                console.log('Maximum: ', weather.max);
                console.log('How is the weather: ', weather.desc.green);

                break;
            case 2:
                search.historyCapitalize.forEach( (place, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${ idx } ${place}`);
                })
                break;
        
            default:
                break;
        }


        await pause();
    } while (opt !== 0);
    
    
    

   
}

main();