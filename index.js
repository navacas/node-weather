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
                const placeSelected = places.find( l => l.id === idSelected);
                // console.log(placeSelected);
                // Weather data of the place selected

                // Show results
                console.log('\nCity information: \n'.green);
                console.log('City: ', placeSelected.name);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperature: ');
                console.log('Minimum: ');
                console.log('Maximum: ');

                break;
        
            default:
                break;
        }


        await pause();
    } while (opt !== 0);
    
    
    

   
}

main();