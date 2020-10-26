import axios from 'axios';
import authenticationHeader from './AuthenticationHeader';

const QUESTIONS_API = '/api/v1/questions/';
const MEDIA_API = '/api/v1/medias/'

export const urlTypes = {
  QUESTIONS: QUESTIONS_API,
  MEDIAS: MEDIA_API,
}


class ApiRequests {

  getUrl(type) {
    switch (type) {
      case urlTypes.QUESTIONS:
        return QUESTIONS_API;
      case urlTypes.MEDIAS:
        return MEDIA_API;
      default:
        return "Type not found";
    }

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

  getUserBoard() {
    return axios.get(QUESTIONS_API , { headers: authenticationHeader() });
  }

  getModeratorBoard() {
    return axios.get(QUESTIONS_API + '1', { headers: authenticationHeader() });
  }

  getAdminBoard() {
    return axios.get(QUESTIONS_API + 'admin', { headers: authenticationHeader() });
  }
}

export default new ApiRequests();
 