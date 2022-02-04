import axios from 'axios';
import {
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS
} from './types';

export const load_user = () => async dispatch => {
    
    if (localStorage.getItem("access")) {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`/accounts/users/me/`, config);
            console.log('loading',res.data)
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: USER_LOADED_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
                
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};
// export const update_profile = (email, username, number, password, plan, gender , dob) => async dispatch => {
//     const config = {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             //'X-CSRFToken': Cookies.get('csrftoken')
//         }
//     };

//     const body = JSON.stringify({
//         'withCredentials': true,
//         email, 
//         username, 
//         number, 
//         password, 
//         plan, 
//         gender , 
//         dob
//     });

//     try {
//         const res = await axios.put(`/accounts/profile`, body, config);
//         console.log(res.data)

//         if (res.data.profile && res.data.email) {
//             dispatch({
//                 type: UPDATE_USER_PROFILE_SUCCESS,
//                 payload: res.data
//             });
//         } else {
//             dispatch({
//                 type: UPDATE_USER_PROFILE_FAIL
//             });
//         }
//     } catch (err) {
//         dispatch({
//             type: UPDATE_USER_PROFILE_FAIL
//         });
//     }
// };

