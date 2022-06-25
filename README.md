# WDC-SYSTEM-API

This is the RESTful API repository for the
Ward Data COllection System [WDCS-API](https://wdcs-staging-api.herokuapp.com/)

## Contents

- [Requirements](#requirements)
- [Tools](#tools)
- [Installation](#installation)
- [Tests](#tests)
- [Development](#development)
- [Production](#production)

## Requirements

- MongoDB
- Npm >= `8.9.0`
- Node >= `16.15.0`

## Tools

- [cors](https://www.npmjs.com/package/chai-things)
- [npm](https://www.npmjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/chai-things)
- [helmet](https://www.npmjs.com/package/helmet)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [express-js](https://expressjs.com/)
- [mongoose-js](https://mongoosejs.com/)

## Installation

- Clone this repository.
- Create .env file. There's .env.example file for reference.

## Tests

- Unit tests are done using **Jest** and **Supertest**.
- All unit tests can be found at `/tests` in each module folder.

To run tests just

```bash
npm run test
```

## Development

1. npm install
2. npm start
3. tsc --watch

## Production

```sh
git push staging <your-local-branch-with-changes>:master
```
