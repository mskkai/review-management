## Description:

As part this project, EMPLOYEE MANAGEMENT system is created such that a registerd admin user will be able to perform

1. Add employee
2. Update employee
3. Delete employee

### Techstacks

#### Core (Backend):

- NodeJS
- Express
- MongoDB / Mongoose

#### View (Frontend):

- React
- PrimeReact (UI Library)

### To Run:

The core(backend) project requires a config folder with dev.env with values for,

PORT,MONGODB_URL,JWT_SECRET_CODE

On the root folder, ** npm run dev-start ** would run both backend (port:3000) and front end (port:8080)

### Assumptions:

1. Admin is already a registered user in the application with valid email id and password.
2. Default password for all the employees created by admin is welcome123.
3. Signup process and changing password is out of scope.
4. Currently application supports only large devices. Responsiveness, mobile support is out of scope.
5. Writing unit tests are out of scope. The test files written in the project are sample test files not complete unit testing files, written & added to showcase the testing procedures for the projects.
