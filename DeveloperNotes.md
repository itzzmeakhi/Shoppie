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

# Added New Address and show saved addresses features

### Commit - 6

Using address form data, the new address is pushed to the array of previously added addresses list and updates the firebase data. The saved addresses are displayed in a bootstrap card style type design, where user can view/edit and also delete the particular address, which are yet to be implemented.

Added validations to the user details updation form and also to the new address form.

# Added edit/view/delete address features

### Commit - 7

Added address-view/edit component so that user can view the address saved and can enter into edit mode to modify the previously stored address. 

Added cancel for editing option, so that the previous values are restored in the form and ends the edit mode in address-edit/user-details-edit component.

Added a feature to the already added address. And also the validation for the address-edit form.

# Added products to display

### Commit - 8

Added displaying products to the loggedIn user using products and products-item component.

Added Detailed view of the product when user click on a particular product by implementing product-detail component.

Added admin/add-product component to add a product, where role based guard should be implemented in further commits.

# Added product Highlights

### Commit - 9

Added highights to the product model and also implemented form array to push product highights from admin/add-product component while adding a product. Should implement displaying product highlights in the product-detail component in further commits.

# Added user product ratings

### Commit - 10

Added a feature, so that user can rate a product out of 5 and can submit the rating. User can rate the specific product only once. It will be impllemted in UI in next commit. 

# Added Cart/BuyNow features

### Commit - 11

Added features so that loggedIn user can add the products to the cart and view them on the cart. Can also select the address from the saved addresses. And can place an order to the the selected address



