This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Runnable NPM Scripts

### `npm run client-install`
Running this program from the root directory of the file structure will install all the necessary packages for the client folder's react server.

### `npm run start`
Running this program from the root directory of the file structure will start the backend express server, giving access to all API functionality (using a program such as Postman or Insomnia).<br>

References [http://localhost:5000/](http://localhost:5000/) when making http calls.

### `npm run server`
Running this program from the root directory of the file structure will provide the same functionality as running `npm run start`.<br>

References [http://localhost:5000/](http://localhost:5000/) when making http calls.<br>

In addition to this, it will also automatically restart the express server whenever a change to the code has been made. This is perfect for development changes or ongoing maintenance.

### `npm run client`
Running this program from the root directory of the file structure will start the react app running on http://localhost:3000/.<br>

Click the following link to view it in the browser: [http://localhost:3000/](http://localhost:3000/).<br>

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run dev`
Running this program from the root directory of the file structure will run the `npm run server` and `npm run client` commands concurrently, effectively simulating the application in production.<br>

This command will allow the front-end and back-end of the application to communicate with each other and allow the developer to test the app effectively.

## Coding Standards

### Variables
1. Constants should all be UPPER_CASE with underscores.
2. Class names should be CapitalisedWithCamelCase.
3. Other variables should be in generic camelCase.
### Comments
4. Classes must be explained in a multiline comment above the class definition.
5. Methods must be explained in a singleline comment above the function.
### Syntax
6. Semicolons must be used at the end of lines.
7. Multiline if statements must use curly braces.
8. Singleline if statements exist on the same line.
9. Arrow functions must be used rather than bindings.
### Naming
10. Component/Model/Utility/Modal files must end with respective type suffix.
### General
11. Object-Oriented coding principles should be followed.
12. For every database model a create, read, update and delete API route must be accessible.
13. Only components that link to another page may exist in app.js.
14. `export default class` should be used to define how classes are exported.
15. Reactstrap should be used for styles and design principles.