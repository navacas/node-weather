
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
            console.log(resp.data);

            return [];
        } catch (error) {
            return [];
        }


        

        // return []; // Return cities
    }





}

export default Searching;



