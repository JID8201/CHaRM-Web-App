## **CHaRM Web App**

This appliation was developed for Georgia Tech's Junior Design program.

The web application that acompanies this mobile application can be found [here](https://github.com/JID8201/CHaRM-Android-App)

Development was done by
- [Lucas Maurer](lmaurer9@gatech.edu)
- [Olivia Powell](opowell6@gatech.edu)
- [Jonathon Humphries](jhumphries30@gatech.edu)
- [Ishtyaq Ponir](iponir3@gatech.edu)
- [Bowen Ran](bran3@gatech.edu)
- [Quynh Nhu Nguyen](qnguyen47@gatech.edu)

This project was sponsered by [Live Thrive](http://livethrive.org/) and Peggy Whitlow Ratcliffe

# *Release Notes*

## New Features
- Website is live at [https://charm-web-app.herokuapp.com/](https://charm-web-app.herokuapp.com/)
- Mobile users can now submit multiple recycle orders at once
- Removed Heatmap functionality due to security concerns and scalability
- Verified UI is fluid and easy to use

## Bug Fixes
- Fixed bug that prevented submitting recycling orders
- Removed unsafe dependency react-heatmap-jsx

## Known Bugs
- Lacks heatmap feature
- Any error from checkPropTypes is a  known issue with React Hot Loader

# *Install Guide*

## Pre-requisites
- A computer with an IOS operating system 
- Node 10+
- npm 6+
- email opowell6@gatech.edu for environment variables necessary for MongoDB

## Dependencies
*This is here solely for our professors since no one else ever lists dependencies for websites this way, you do not need to download these separately*
- babel 7.1.5
- material-ui 3.3.2
- bcrypt 3.0.2
- body-parser 1.18.3
- cors 2.8.4
- dotenv 6+
- es6-promise 4.2.5
- express 4.16.3
- fast-csv 2.4.1
- helmet 3.15+
- isomorphic-fetch 2.2.1
- jsonwebtoken 8.4+
- mobx 5.1+
- mobx-react 5.2.8
- moment 2.22.2
- mongoose 5.3.1
- passport 0.4+
- passport-jwt 4+
- passport-local 1+
- prop-types 15.6.2
- react 16.6+
- react-dates  18.1.1
- react-dom 16.6+
- react-router 4.3.1
- react-router-dom 4.3.1
- react-with-direction 1.3+
- recharts 1.3.4
- superagent 4+

## Download Instructions
The website app code can be downloaded:
- as a zip file by clicking [here](https://github.com/JID8201/CHaRM-Web-App/archive/master.zip)

or 

- by cloning this repository by downloading [git](https://git-scm.com/downloads) and running the following command in a terminal
```
git clone git@github.com:JID8201/CHaRM-Web-App.git
```

## Installation/Build Instructions 
To install the web app, open a terminal and manuever to the CHaRM-Web-App source code.

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
