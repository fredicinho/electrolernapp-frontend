import axios from 'axios';
import authenticationHeader from './AuthenticationHeader';


const QUESTIONS_API = '/api/v1/questions/';
const MEDIA_API = '/api/v1/medias/';
const CATEGORY_API = '/api/v1/categories/';
const CATEGORYSET_API = '/api/v1/categorySets/';
const EXAMSET_API = '/api/v1/examSets/'
const INSTITUTION_API = '/api/v1/institutions/';
const SCHOOLCLASS_API = '/api/v1/schoolClasses/';
const USERS_API = '/api/v1/users/';
const EXAMCHECK_API = '/api/v1/examResults/check';


export const urlTypes = {
  QUESTIONS: QUESTIONS_API,
  MEDIAS: MEDIA_API,
  CATEGORIES: CATEGORY_API,
  CATEGORYSET: CATEGORYSET_API,
  EXAMSET: EXAMSET_API,
  INSTITUTION: INSTITUTION_API,
  SCHOOLCLASS: SCHOOLCLASS_API,
  USERS: USERS_API,
  EXAMCHECK: EXAMCHECK_API
}


class ApiRequests {

  apiGetRequest(url) {
    return axios.get(url, { headers: authenticationHeader()})
  }

  apiPostRequest(url, data) {
    return axios.post(url, data, { headers: authenticationHeader()});
  }

  apiPutRequest(url, data) {
    return axios.put(url, data, { headers: authenticationHeader()})
  }

  getAllQuestions() {
    return axios.get(QUESTIONS_API, { headers: authenticationHeader()})
  }

  getQuestionById(id) {
    return axios.get(QUESTIONS_API + id, { headers: authenticationHeader()})
  }

  getMediaById(id) {
    return axios.get(MEDIA_API + id, { headers: authenticationHeader()})
  }

}

export default new ApiRequests();
 