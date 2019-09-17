This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run database`

Runs the server.js file, connecting the application to the MongoDB Database instance.<br>
References [http://localhost:5000](http://localhost:5000) when making http calls.

Server will reload if any changes are made to the server.js file.


## Additional Scripts

In the project directory you can run:

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Coding Standards

### Variables
1. Constants should all be UPPER_CASE with underscores.
2. Class names should be CapitalisedWithCamelCase.
3. Other variables should be in generic camelCase.
### Comments
4. Classes must be explained in a multiline comment above the class definition.
5. Methods must be explained in a singleline comment above the function.
## Syntax
6. Semicolons must be used at the end of lines.
7. Multiline if statements must use curly braces.
8. Singleline if statements exist on the same line.
9. Arrow functions must be used rather than bindings.
## Naming
10. Component/Model/Utility/Modal files must end with respective type suffix.
## General
11. Object-Oriented coding principles should be followed.
12. For every database model a create, read, update and delete API route must be accessible.
13. Only components that link to another page may exist in app.js.
14. `export default class` should be used to define how classes are exported.
15. Reactstrap should be used for styles and design principles.