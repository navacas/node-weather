import 'dotenv/config';

import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
import Searching from "./models/search.js";




const main = async() =>{

    const search = new Searching();
    let opt;
    
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Show message
                const place = await readInput('City: ');
                await search.city(place);
                // Search the places

                // Select the place

                // Weather data of the place selected

                // Show results
                console.log('\nCity information: \n'.green);
                console.log('City: ');
                console.log('Lat: ');
                console.log('Lng: ');
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