import axios from "axios";

const AUTHENTICATION_API = "/api/v1/auth/";

class AuthenticationRequests {
  login(username, password) {
    return axios.post(AUTHENTICATION_API + "signin", {
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
    return axios.post(AUTHENTICATION_API + "signup", {
      username,
      email,
      password,
      role: ['ROLE_USER'],
    });
  }

  startExam(username, password, examSetId) {
    return axios.post(AUTHENTICATION_API + "startExam?examSetId=" + examSetId, {
      username,
      password
    })
        .then(response => {
            console.log("Response of starting Exam sign in ::")
            console.log(response.data)
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        });
  }

  endExam(examSetId) {
    return axios.post(AUTHENTICATION_API + "endExam?examSetId=" + examSetId, {})
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationRequests();
