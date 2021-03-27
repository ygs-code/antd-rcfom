
import { SET_MUNBER } from './actionTypes'
export const clickAdd = function (data) {
    return (dispatch, getState) => {
        dispatch({ type: SET_MUNBER, data: data });
    };
}
// export default {
//     clickAdd
// }