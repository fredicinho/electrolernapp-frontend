import axios from 'axios';
import authenticationHeader from './AuthenticationHeader';

const API_VERSION = '/api/v1/';

const QUESTIONS_API = API_VERSION + 'questions/';
const MEDIA_API = API_VERSION + '/medias/';
const CATEGORY_API = API_VERSION + 'categories/';
const CATEGORYSET_API = API_VERSION + 'categorySets/';
const EXAMSET_API = API_VERSION + 'examSets/'
const INSTITUTION_API = API_VERSION + 'institutions/';
const SCHOOLCLASS_API = API_VERSION + 'schoolClasses/';
const USERS_API = API_VERSION + 'users/';
const EXAMCHECK_API = API_VERSION + 'examResults/check';
const STATISTIC_API = API_VERSION + 'statistics/statistics';
const EXAMRESULT_API = API_VERSION + 'examResults/';
const AUTHENTICATION_API = API_VERSION + "auth/";
const CHECKAUTH_API = AUTHENTICATION_API + 'isTeacherOrAdmin';
const PASSWORDRESET_API = API_VERSION + 'forgotPassword/';
const NEWPASSWORD_API = PASSWORDRESET_API + "resetPassword";


export const urlTypes = {
  QUESTIONS: QUESTIONS_API,
  MEDIAS: MEDIA_API,
  CATEGORIES: CATEGORY_API,
  CATEGORYSET: CATEGORYSET_API,
  EXAMSET: EXAMSET_API,
  INSTITUTION: INSTITUTION_API,
  SCHOOLCLASS: SCHOOLCLASS_API,
  USERS: USERS_API,
  EXAMCHECK: EXAMCHECK_API,
  STATISTICS: STATISTIC_API,
  EXAMRESULT: EXAMRESULT_API,
  CHECKAUTH: CHECKAUTH_API,
  AUTH: AUTHENTICATION_API,
  PASSWORDRESET: PASSWORDRESET_API,
  NEWPASSWORD: NEWPASSWORD_API,
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
 