#### Initial Commit

Initialised Repository and Installed bootstrap library along with its dependencies.

# Added Authorization & Header Component

### Commit - 1

Using Firebase Rest Auth API, Implemented signup/login components such that signup component takes user details and creates a user and login's automatically. Using those credentials, a user can login to the app.

Header component is designed so that is displays shoppie name when any user is loggedIn. And displays links to navigate other components when an user is Authenticated.

Both login/signup component receives response a JWT Token from the firebase and while signup/login the JWT token is stored in Browser LocalStorage to implement autoLogin Feature, until the token is expired.

# Added Auto-Logout/Login

### Commit -2

Implemented Auto-Login/Auto-Logout feature, based on the Validity of JWT Token. 

Removed Valiadtion Errors in the Login component. 

Added a Auth Guard, so that it will protect the routes in which it is provided, can accessible those routes only when the user is authenticated. 

Added a Auth Interceptor the add the Auth Token to the http requests going to fetch the firebase.

# Added User Component

### Commit - 3

Added User component and Side Navbar component so that these components on created fetches the current User LoggedIn Data and displays it.

User component displays the user data to the data, and when edit mode is clicked, the user can modify few fields in the data. Some fields can't be modified like userEmail, userDOB, userGender etc.

While creating new user, for userLocation, display name and display picture are filled with dummy data. So user can edit them and change whenever he needs it!

# Added SideNav and Edit user Details

### Commit - 4

Added user service to retrive user details and display it in the Side Nav Component

# Removed Issued with UserDetails Updation

### Commit - 5

Removed User Details Updation details in SideNav when an user updates his/her details by adding an rxjs BehviorSubject to the user details by emitting them whenever details updated.



