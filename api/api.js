import axios from 'axios';
import { AsyncStorage} from 'react-native';

const baseUrl = 'http://192.168.249.2:3000/dresSmart';



export function submitdb(account,mail,ages) {
    const url  = baseUrl + "/submitdb";
    alert(url);
    axios.post(url, {
            account,
            mail,
            ages
    }).then( res => {
        return res.data;
    })
    .catch( error => {
        alert(error);
    });
}
