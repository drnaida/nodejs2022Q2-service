# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Automatic Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Testing with hands

#### Users

1. Get users

GET /user

2. Get the user by id

GET /user/:id

3. Create user

POST /user

Body:

{
    "login": "Christian",
    "password": "1231232131231231"
}

4. Update user

PUT /user/:id

Don't forget to type CORRECT old password!

{
    "oldPassword": "1231232131231231",
    "newPassword": "lalala"
}

5. Delete user

DELETE /user/:id

#### Tracks

1. Get tracks

GET /track

2. Get track by id

GET /track/:id

3. Create track

POST /track

Body:

{
"name": "string",
"duration": 0
}

4. Update track

PUT /track/:id

Body:
{
"name": "Bohemian Rhapsody",
"artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
"duration": 355,
"albumId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

5. Delete track

DELETE /track/:id


#### Artists

1. Get artists

GET /artist

2. Get artist by id

GET /artist/:id

3. Create artists

POST /artist

Body:

{
"name": "string",
"grammy": true
}

4. Update artist

PUT /artist/:id

Body:
{
"name": "string",
"grammy": false
}

5. Delete artist

DELETE /artist/:id

#### Albums

1. Get albums

GET /album

2. Get album by id

GET /album/:id

3. Create albums

POST /album

Body:

{
"name": "string",
"year": 0,
"artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

4. Update album

PUT /album/:id

Body:
{
"name": "lalala",
"year": 0,
"artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

5. Delete album

DELETE /album/:id

#### Favorites

1. Get favorites

GET /favs

2. Create favorite artist

POST /favs/artist/:id

3. Delete favorite artist

DELETE /favs/artist/:id

4. Create favorite album

POST /favs/album/:id

5. Delete favorite album

DELETE /favs/album/:id

2. Create favorite track

POST /favs/track/:id

3. Delete favorite track

DELETE /favs/track/:id

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
