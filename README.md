[![Build Status](https://travis-ci.org/AdinoyiSadiq/MyDiary.svg?branch=develop)](https://travis-ci.org/AdinoyiSadiq/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/AdinoyiSadiq/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/AdinoyiSadiq/MyDiary?branch=develop)
<!-- [![Maintainability](https://api.codeclimate.com/v1/badges/047ca4029459a4e72c0b/maintainability)](https://codeclimate.com/github/AdinoyiSadiq/MyDiary/maintainability) -->
# MyDiary

MyDiary is an online journal where users can pen down their thoughts and feelings.

## API Endpoint: [https://mydiary-server.herokuapp.com/api/v1/entries](https://mydiary-server.herokuapp.com/api/v1/entries)

## Documentation
Find the API documentation here: [MyDiary API Documentation](https://mydiary2.docs.apiary.io/)

## API Setup

```
# Clone this repository
git clone https://github.com/AdinoyiSadiq/MyDiary.git

# Switch into the directory of the project
cd MyDiary

# Switch to the server branch
git checkout server

# Install dependencies
npm install

# Start application 
npm run dev

# Run api tests
npm run test
```

## API Endpoints

| Endpoint                                         | Functionality                      |
| ------------------------------------------------ | ---------------------------------- |
| GET /entries                                     | Fetch all entries                  |
| GET /entries/:entryId                            | Fetch a single entry               |
| POST /entries                                    | Create an entry                    |
| PUT /entries/:entryId                            | Modify an entry                    |
| DELETE /entries/:entryId                         | Delete an entry                    |
| POST /auth/signup                                | Create a user                      |
| POST /auth/signin                                | Sign into an account               |
| GET /profile                                     | Fetch user profile                 |
| GET /reminders                                   | Fetch all reminders                |
| POST /reminders                                  | Create a reminder                  |
| GET /reminder/time                               | Get a reminder time                |
| PUT /reminder/:id                                | Get a single reminder              |

## MyDiary App UI Template
The gh-pages branch contains the template UI for the MyDiary app

## Getting Started
```sh
# Clone this repository
git clone https://github.com/AdinoyiSadiq/MyDiary.git

# Switch into the directory of the project
cd MyDiary

# Switch to the gh-pages branch
git checkout gh-pages

# Open the index.html page in the UI directory
```

## UI Template
https://adinoyisadiq.github.io/MyDiary/UI/index.html

## Features
+ Users can create an account and log in.
+ Users can view all entries to their diary.
+ Users can view the contents of a diary entry.
+ Users can add or modify an entry.
+ Users can set and get daily notifications that prompt them to add an entry to their diary.