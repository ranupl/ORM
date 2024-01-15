Requirements- 

Node Js - v18.17.1
MySQL - 8.0.34

1. In mysql create a User with password as root
2. Create database with name - instahyre

Commands for configuring dependencies-

npm install

Create .env file at path INSTAHYRE/.env

Add following environment varibles in .env file -

PORT=5000
HOST="localhost"
USER="root"
PASSWORD="root"
DB="instahyre"
DIALECT="mysql"

To start the app - 
npm start

Description -

NOTE :- All the operations except registration using this endpoints require authorization token which is generated at the time of login.

POSTMAN COLLECTION :- https://drive.google.com/file/d/1AhAVV_-Et7Xo2ONZYtC3n-S8IqgEvaJA/view?usp=sharing

1. api/register
Desc - register user on the app.

2. api/login
Desc - logs user in.

3. api/get/name
Desc - Searches phone number info by name.

4. api/get/phonenumber
Desc - Provides list of phone number from the global db with different names.

5. api/get/phoneinfo
Desc - Provides  a phone number information for a perticular phone number using a phone number as a request param ,it provide email if phone number is registered and is a contact of the user searching it else it will only provide name and phone number. 

6. api/markSpam
Desc - This endpoint updates spam status of a perticular phone number taking input as phone number and spam values as true/false.

NOTE :-
true represents as spam 
false represents as not spam

7. api/checkSpam
Desc - Gives a status of phone whether its a spam or not.

NOTE :-
true represents as spam 
false represents as not spam

8. api/addContact
Desc - this is created for testing purpose. This helped me in inserting data in user ,mapping and global tables for various scenarios.


