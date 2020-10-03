This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Informations
In the CI/CD Lifecycle this application will be available on  http://wiproh20-owerlen.enterpriselab.ch/

## Available Scripts
Start the app (available on Port 3000):

### `npm start`

Build Docker Image:

### `docker build --tag electrolernapp:1.0 .`


Start the Docker Container:

### `docker run -p 1337:80 -d --name electrolernapp electrolernapp:1.0`

