import axios from 'axios';
import { AsyncStorage} from 'react-native';

const baseUrl = 'http://172.20.81.110:8080';



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

export function signup(account, email, password) {
    const url = baseUrl + "/signup";
    return axios.post(url, {
        account, email, password
    })
    .then( res => {
        return res.data;
    })
    .catch(error => {
        alert(error);
    });
}
