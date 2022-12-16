# USER ORGNAIZATION
## Overview 
* I have worked on the user orgnaization Operations using the techonlogy i.e
* I have implemented the password functionality in which i have used the bcrypt(used for the password hashing)
* Implement the validations as well for this i have used the Joi validator.
* i have used jwt to genrate the token 
* a) Express framework-4.18.2
* b) Mongodb database -4.11.0
* c) Node version-v16.18.1
* d) Npm version-8.19.2
* e) Bcrypt version-5.1.0
* f) Dotenv version-16.0.3
* g) Mongoose version-6.7.3
## Steps for using crud
* step1->npm i
* step2->npm start
# CRUD API Link & Working:
  ## USER Register :POST API --   localhost:3000/user/add
* Here you can register yourself and you can add orgnaization its optional 
* 1. you have to fill a unique username which is required
* 2. you have to fill your firstname which is required
* 3. you have to fill your lastname which is required
* 4. you have to fill your email which is required
* 5. you have to fill your password which is required
* 6. you have to fill orgnaization name which is optional 
* you have to fill address which is optional if you entered any field then all field will required
* 1. you have to fill addressLine1 which is required
* 2. you have to fill addressLine1 which is optional
* 3. you have to fill city which is required
* 4. you have to fill state which is required
* 5. you have to fill country which is required
* 6. you have to fill zipcode which is required
    
  ## USER LOGIN : POST API -- localhost:3000/user/login
* Here you can login from username and password 
* 1. you have to fill a  username which is required
* 2. you have to fill your password which is required

  ## USER ORGNAIZATION ADD : POST API -- localhost:3000/org/add
* After login token genrated and through token  you can add your orgnaization as many as you can 
* a. you have to fill orgnaization name which is optional 
* you have to fill address which is optional if you entered any field then all field will required the last orgnaization you add it will be default active
* 1. you have to fill addressLine1 which is required
* 2. you have to fill addressLine1 which is optional
* 3. you have to fill city which is required
* 4. you have to fill state which is required
* 5. you have to fill country which is required
* 6. you have to fill zipcode which is required

  ## USER ORGNAIZATION LIST : GET API --  localhost:3000/org/list
* Here you can have your all orgnaization list through token you can get your all orgnaization list
* You can view which orgnaization is currently active 

  ## USER PROFILE UPDATE : PUT API -- localhost:3000/user/update
* Here you can update only your profile
* 1. you have to fill a unique username you cannot enter same username in this field you have to fill another unique username which is required
* 2. you have to fill your firstname which is optional but not empty
* 3. you have to fill your lastname which is optional but not empty
* 4. you have to fill your email which is optional but not empty
* 5. you have to fill your password which is optional if you have access to update password you can update

  ## USER ORGNAIZATION UPDATE : PUT API -- localhost:3000/org/list/update/:id
* Here you can update your orgnaization
* a. you have to fill orgnaization name which is optional 
* you have to fill address which is optional if you entered any field then all field will required after updation of current orgnaization it will be active 
* 1. you have to fill addressLine1 which is required
* 2. you have to fill addressLine1 which is optional
* 3. you have to fill city which is required
* 4. you have to fill state which is required
* 5. you have to fill country which is required
* 6. you have to fill zipcode which is required