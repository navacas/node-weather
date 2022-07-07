
import axios from 'axios';


class Searching {

    history = ['Tegucigalpa', 'MAdrid', 'San josé'];

    constructor(){
        // read DB is exists
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





}

export default Searching;



