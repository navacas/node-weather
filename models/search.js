import fs from 'fs';

import axios from 'axios';


class Searching {

    history = [];
    dbPAth = './db/database.json';

    constructor(){
        // read DB is exists
        this.readDB();
    }

    get historyCapitalize(){
        return this.history.map( place =>{
            let words = place.split(' ');
            words = words.map( w => w[0].toUpperCase() + w.substring(1));

            return words.join(' ');
        })
    }

    get paramsMapbox(){
        return  {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async city( place = ''){
        try {
            //HTTP petition
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));

           
            

            
        } catch (error) {
            return [];
        }


        

        // return []; // Return cities
    }

    get paramsOpenweather(){
        return  {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async weatherPlace( lat, lon ){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenweather, lat, lon}
            });

            const resp = await instance.get();
            const {weather, main} = resp.data;
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

            
        } catch (error) {
            console.log(error);
        }
    }

    addSearchRecord(place = '') {

        if(this.history.includes( place.toLocaleLowerCase())){
            return;
        }

        this.history.unshift( place.toLocaleLowerCase() );

        // record on db
        this.saveDB();

    }

    saveDB(){

        const payload = {
            history: this.history
        }
        fs.writeFileSync( this.dbPAth, JSON.stringify(payload))
    }

    readDB(){
        if ( !fs.existsSync(this.dbPAth)) return;

        const info = fs.readFileSync( this.dbPAth, { encoding: 'utf-8'});
        const data = JSON.parse( info );

        this.history = data.history;

    }



}

export default Searching;



