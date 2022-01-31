# Timer Manager | React, Redux, Firebase

The app helps you with time managing tasks you spent on various projects.

## Demo

[Deployed on Netlify (front-end))](https://kubahrom-timer-manager.netlify.app/)

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Redux](https://www.apollographql.com/) - State management library
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Middleware which allows action creators to return a function
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [Material-UI w/ lots of CSS customisations](https://material-ui.com/) - UI library
- [Framer Motion](https://www.framer.com/motion/) - Open-source motion library for React

## Features

- Authentication (login/register w/ email & password)
- CRUD projects
- CRUD tasks, with timer and comment
- Dashboard with your projects
- Filter dashboard projects
- Error management with descriptive messages
- Loading spinners for fetching processes
- Proper responsive UI for all screens
- Page transition animations

## Screenshots

#### Desktop/Tablet

![Desktop-1](https://github.com/kubahrom/timer-manager/blob/main/screenshots/desktop-1.png)
![Desktop-2](https://github.com/kubahrom/timer-manager/blob/main/screenshots/desktop-2.png)

#### Mobile

![Mobile-1](https://github.com/kubahrom/timer-manager/blob/main/screenshots/mobile.png)

## Usage

#### Env variable:

Create a .env.local file in client directory and add the following:

```
REACT_APP_APIKEY= *Get from Firebase*
REACT_APP_AUTHDOMAIN= *Get from Firebase*
REACT_APP_PROJECTID= *Get from Firebase*
REACT_APP_STORAGEBUCKET= *Get from Firebase*
REACT_APP_MESSAGINGSENDERID= *Get from Firebase*
REACT_APP_APPID= *Get from Firebase*
```

#### Client:

Run client development server:

```
npm install
npm start
```
