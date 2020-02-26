#### Commit - 1 : Initial Commit

Initialised Repository and Installed bootstrap library along with its dependencies.

# Added Authorization & Header Component

### Commit - 3

Using Firebase Rest Auth API, Implemented signup/login components such that signup component takes user details and creates a user and login's automatically. Using those credentials, a user can login to the app.

Header component is designed so that is displays shoppie name when any user is loggedIn. And displays links to navigate other components when an user is Authenticated.

Both login/signup component receives response a JWT Token from the firebase and while signup/login the JWT token is stored in Browser LocalStorage to implement autoLogin Feature, until the token is expired.

