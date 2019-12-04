# currency-test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It allows to convert any amount between 6 most popular currencies: USD, SEK, GBP, RUB, EUR and CHF. You can convert in both ways, i.e., switch currencies by clicking arrow button.

Provided rates are relevant as of December 3rd, 2019. [Fixer.io free plan](https://fixer.io/product) does not allow fetching data for any base currency, except for EUR. If you have Basic plan or higher, you can set `FAKE_FIXER` environment variable to `false`, specify `ACCESS_KEY` and fetch updated data.

Project is made with Node Express Apollo Server with GraphQL on the backend and React Apollo Styled components on the frontend. Tests are written in Jest, code quality is guaranteed by EsLint, Prettier and other plugins.

Currency test app is [deployed on Heroku](https://currency-app-test.herokuapp.com/).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to access GraphQL playground and test queries.
Server and client can be shown and edited at the same time thanks to Nodemon and Concurrently.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
