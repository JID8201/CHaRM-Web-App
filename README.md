## **CHaRM Web App**

This application was developed for Georgia Tech's Junior Design program.

The mobile application that accompanies this web application can be found [here](https://github.com/JID8201/CHaRM-Android-App)

Development was done by
- [Lucas Maurer](lmaurer9@gatech.edu)
- [Olivia Powell](opowell6@gatech.edu)
- [Jonathon Humphries](jhumphries30@gatech.edu)
- [Ishtyaq Ponir](iponir3@gatech.edu)
- [Bowen Ran](bran3@gatech.edu)
- [Quynh Nhu Nguyen](qnguyen47@gatech.edu)

This project was sponsored by [Live Thrive](http://livethrive.org/) and Peggy Whitlow Ratcliffe

# *Release Notes*

## V1.0.0
### New Features
- Website is live at [https://charm-web-app.herokuapp.com/](https://charm-web-app.herokuapp.com/) (As of now the web app is being hosted using [Heroku](https://dashboard.heroku.com/)
- Mobile users can now submit multiple recycle orders at once
- Removed Heatmap functionality due to security concerns and scalability
- Verified UI is fluid and easy to use

### Bug Fixes
- Fixed bug that prevented submitting recycling orders
- Removed unsafe dependency react-heatmap-jsx
- Made graphs larger so that all elements show up correctly

### Known Bugs
- Lacks heatmap feature
- Any error from checkPropTypes is a  known issue with React Hot Loader

# *Install Guide*

## Pre-requisites
- A computer
- Access to the internet 
- One of the following: MongoDB, MONGODB Atlas, or MLab

## Dependencies
- Node 10+
- npm 6+
- email opowell6@gatech.edu for environment variables necessary for MongoDB

## Download Instructions
The website app code can be downloaded:
- as a zip file by clicking [here](https://github.com/JID8201/CHaRM-Web-App/archive/master.zip)

or 

- by cloning this repository by downloading [git](https://git-scm.com/downloads) and running the following command in a terminal
```
git clone git@github.com:JID8201/CHaRM-Web-App.git
```

## Installation/Build Instructions 
To install the web app, open a terminal and maneuver to the CHaRM-Web-App source code.

Once inside the CHaRM-Web-App directory, type the following command into the terminal

 ```npm install```

This will install all required dependencies, and build the website which will take a minute or so.

## Run Instructions
To run the web app, all you need to do is type the following command into the same terminal used to build the web app

```npm run dev```

The website runs on port 3000 and the backend runs on port 3001

- To access the website after running the code base locally type ```http://localhost:3000/``` into a browser navigation bar

## Troubleshooting
- The website might take a minute to load so *be patient*
- Debugging the [live website](https://charm-web-app.herokuapp.com) is difficult to impossible. If you're adding functionality to the web app, do so in a feature branch and debug locally
- Console log statements are your friend when trying to track down bugs
- If you visit the [live website](https://charm-web-app.herokuapp.com) site and nothing loads but you are SURE that nothing is wrong server side, check to make sure you have cookies enabled in your browser and clean your cache. 
- Pick an IDE capable of debugging javascript (VS Code is a great option) and use that. 
