import axios from 'axios';
import authenticationHeader from './AuthenticationHeader';

const QUESTIONS_API = '/api/v1/questions/';
const MEDIA_API = '/api/v1/medias/';
const CATEGORY_API = '/api/v1/categories/';
const CATEGORYSET_API = '/api/v1/categorysets/';


export const urlTypes = {
  QUESTIONS: QUESTIONS_API,
  MEDIAS: MEDIA_API,
  CATEGORIES: CATEGORY_API,
  CATEGORYSET: CATEGORYSET_API,
}


class ApiRequests {

  getUrl(type) {
    switch (type) {
      case urlTypes.QUESTIONS:
        return QUESTIONS_API;
      case urlTypes.MEDIAS:
        return MEDIA_API;
      case urlTypes.CATEGORIES:
        return CATEGORY_API;
      case urlTypes.CATEGORYSET:
        return CATEGORYSET_API;
      default:
        console.log("Type of URL not found!");
        return "Type not found";
    }

  }

  apiGetRequest(url) {
    return axios.get(url, { headers: authenticationHeader()})
  }

  apiPostRequest(url, data) {
    return axios.post(url, data, { headers: authenticationHeader()});
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
 