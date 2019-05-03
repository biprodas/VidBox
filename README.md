# VidBox - a movie rental service app

> Learning Node.js by creating a video store app, by the following udemy tutorial: [Node.js: The Complete Guide to Build RESTful APIs (2018)](https://www.udemy.com/nodejs-master-class/).

## To do

- [x] Build models and APIs:
  - [x] Genres
  - [x] Customers
  - [x] Restructure Genres & Customers models
  - [x] Movies
  - [x] Rentals
  - [x] Returns
- [ ] Authentication/Authorization
- [ ] Handling and logging errors
  - [ ] set up winston
  - [ ] add logging
- [ ] Testing
  - [ ] Unit testing (genres)
    - [ ] user model
    - [ ] auth middleware
  - [ ] Integration testing
    - [ ] auth route
    - [ ] genres route
    - [ ] returns route
  - [ ] End to end testing
- [ ] Deployment

## Quick Start
#### Prerequisites
- > Install [NodeJS](https://nodejs.org/en/download/).
- > Connect to [mongoDB](https://www.mongodb.com/).

#### After complete installation Node and mongodb.

```bash
git clone https://github.com/bipro10/VidBox.git
cd VidBox
npm install
npm start
```

# APIs 

#### Auth endpoints
      
#### User endpoints
  - GET
    - /api/genres
    - /api/genres/:id
  - POST
    - /api/genres
  - PUT 
    - /api/genres/:id
  - DELETE
    - /api/genres/:id


## Features:
* route handling using `express`
* NoSQL database using `mongodb`
* request validation using `joi`
* database and file logging using `winston`
* authentication and authorization using `jwt` and `bcrypt`
* unit and integration tests using `jest` and `supertest`

## Useful links:

- [Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet)
- [vscode keyboard shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
- [http status codes](https://github.com/waldemarnt/http-status-codes)
- [jwt web tokens](https://jwt.io)

