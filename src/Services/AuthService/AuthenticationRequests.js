import axios from "axios";
import authenticationHeader from "./AuthenticationHeader";
import {urlTypes} from "./ApiRequests";


class AuthenticationRequests {
  login(username, password) {
    return axios.post(urlTypes.AUTH + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(urlTypes.AUTH + "signup", {
      username,
      email,
      password,
      role: ['admin'],
    });
  }

  resetPassword(email) {
      const bodyFormData = new FormData();
      bodyFormData.append('email', email)
      return axios(
          {
              method: 'post',
              url: urlTypes.PASSWORDRESET,
              data: bodyFormData,
              headers: {'Content-Type': 'multipart/form-data' }
          }
      );
  }

  createNewPassword(password, resetToken) {
      const bodyFormData = new FormData();
      bodyFormData.append('password', password);
      bodyFormData.append('token', resetToken);
      return axios(
          {
              method: 'post',
              url: urlTypes.NEWPASSWORD,
              data: bodyFormData,
              headers: {'Content-Type': 'multipart/form-data' }
          }
      );
  }

  startExam(username, password, examSetId) {
    return axios.post(urlTypes.AUTH + "startExam?examSetId=" + examSetId, {
      username,
      password
    })
        .then(response => {
          if (response.data.accessToken) {
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        })
  }

  endExam(examSetId) {
    return axios.post(urlTypes.AUTH + "endExam?examSetId=" + examSetId, {}, { headers: authenticationHeader()})
        .then(response => {
          if (response.data.accessToken) {
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  isAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.roles.includes("ROLE_ADMIN")
  }

  isTeacher() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.roles.includes("ROLE_TEACHER");
  }

  isUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.roles.includes("ROLE_USER");
  }
}

export default new AuthenticationRequests();
