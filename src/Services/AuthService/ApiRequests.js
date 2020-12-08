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
const STATISTIC_API = API_VERSION + 'statistics/';
const USERSTATISTIC_API = STATISTIC_API + 'User/';
const POSTARRAYSTATISTIC_API = STATISTIC_API +'statistics';
const EXAMRESULT_API = API_VERSION + 'examResults/';
const AUTHENTICATION_API = API_VERSION + "auth/";
const CHECKAUTH_API = AUTHENTICATION_API + 'isTeacherOrAdmin';
const PASSWORDRESET_API = API_VERSION + 'forgotPassword/';
const NEWPASSWORD_API = PASSWORDRESET_API + "resetPassword";
const CSV_API = API_VERSION + "csv/";
const CSVUSERS_API = CSV_API + "users";
const EXPORT_QUESTIONS_API = CSV_API + "questions/export";
const EXAMOVERVIEW_API = EXAMRESULT_API + "examResultOverview/";
const API_URL = 'http://wiproh20-owerlen.enterpriselab.ch:8080';


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
  POSTARRAYSTATISTIC: POSTARRAYSTATISTIC_API,
  USERSTATISTIC: USERSTATISTIC_API,
  EXAMRESULT: EXAMRESULT_API,
  CHECKAUTH: CHECKAUTH_API,
  AUTH: AUTHENTICATION_API,
  PASSWORDRESET: PASSWORDRESET_API,
  NEWPASSWORD: NEWPASSWORD_API,
  CSVUSERS: CSVUSERS_API,
  EXPORT_QUESTIONS: EXPORT_QUESTIONS_API,
  EXAMOVERVIEW: EXAMOVERVIEW_API,
  API_URL: API_URL,
}


class ApiRequests {

  apiGetRequest(url) {
    return axios.get(url, { headers: authenticationHeader()})
  }

  apiPostRequest(url, data) {
    return axios.post(url, data, { headers: authenticationHeader()});
  }

  apiPostFileRequest(url, data) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", data[0]);
    console.log("Sending following FormData")
    console.log(bodyFormData.get('file'))
    return axios.post(urlTypes.CSVUSERS, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return axios(
        {
          method: 'post',
          url: url,
          data: bodyFormData,
          headers: {'Content-Type': 'multipart/form-data' }
        }
    );
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
 