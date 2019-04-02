import axios from 'axios';

export function userFormRequest(userData) {
  return dispatch => {
    return axios.post('/hr_recruit/users/filltheform', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/hr_recruit/users/${identifier}`);
  }
}

