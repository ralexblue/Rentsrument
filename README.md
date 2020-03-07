# Rentrument-Server
Name:Rentstrument
link:https://renstument-app.now.sh/
Server-side:
The server is runned using node.js and knex to connect to a postgressSQL Database.
The server has simple CRUD Operations for Instruments.
The server also has JWT-authentication and creation for each individual user,
it has protected routes for some Instrument implementation.
The endpoints used are:
Instrument Methods
Get method /intruments
This method is supposed to grabs all intruments in database that was posted 

Get method /intruments/:id
This method is supposed to grab one intruments in database that was posted and gives user info who posted it

POST method /intruments
This methods need authentication or a user account.Creates a instrument requiring description, image,name and category in the body.

DELETE method /intruments/:id
This methods need authentication or a user account.it looks through the database and delete the id that instrument owns.
PATCH method /intruments/:id
This methods need authentication or a user account.it patches a specific instrument and changes it's wahttever the user wants to change about it.
Get method /intruments/users/:id
Grabs all instruments that a user owns will later be implemented so the other user can see and free public could see.
User methods
POST method /user
This method requires {user_name,password,full_name} so it can be posted in the database.Makes a new user so they can use the other instrument methods.
PATCH method /user
This methods need authentication or a user account.This changes the user info do whatever they want and changes user name,contact and email doesn't change password.
Auth Methods
 POST me /Login
This method requires {user_name,password} and logs in a user and returns a jwt token with context user_id to grab user info from the database without loading all users.



![Image of app](https://github.com/ralexblue/Renstrument-client/blob/master/Capture2.png)
![Image of app2](https://github.com/ralexblue/Renstrument-client/blob/master/Capture.png)

summary:
My app should function similarly to another popular application called Craiglist,but rather than multiple objects it should only be used to rent Instruments for people who have that extra guitar or  people who had never touched their bought drums. 
A person can make an account then login to that account.Onced login they can post instruments,for how many instrument they want to Rent out.The description should be used as price and Instrument condition.The user can edit and delete an instument they posted if they want to.Also a user doesn't have to make an account to see all Instruments all they have to do is browse the selections.


Tech:HTML,CSS,React,PostgressSQl,Nodejs

