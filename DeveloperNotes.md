#### Initial Commit

Initialised Repository and Installed bootstrap library along with its dependencies.

# Added Authorization & Header Component

### Commit - 1

Using Firebase Rest Auth API, Implemented signup/login components such that signup component takes user details and creates a user and login's automatically. Using those credentials, a user can login to the app.

Header component is designed so that is displays shoppie name when any user is loggedIn. And displays links to navigate other components when an user is Authenticated.

Both login/signup component receives response a JWT Token from the firebase and while signup/login the JWT token is stored in Browser LocalStorage to implement autoLogin Feature, until the token is expired.

# Added Auto-Logout/Login

### Commit -2

Implemented Auto-Login/Auto-Logout feature, based on the Validity of JWT Token. Removed Valiadtion Errors in the Login component. Added a Auth Guard, so that it will protect the routes in which it is provided, can accessible those routes only when the user is authenticated. Added a Auth Interceptor the add the Auth Token to the http requests going to fetch the firebase.

