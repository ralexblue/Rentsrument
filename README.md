# Rentrument-Client
Name:Rentstrument
link:https://renstument-app.now.sh/
Server-side:
The server is runned using node.js and knex to connect to a postgressSQL Database.
The server has simple CRUD Operations for Instruments.
The server also has JWT-authentication and creation for each individual user,
it has protected routes for some Instrument implementation.
The endpoints used are:
/intruments "POST,DELETE,PATCH,GET"
/users "POST,PATCH"
/Login "POST"

![Image of app](https://drive.google.com/file/d/19je9iMu2WdfnWNhY6ymWMr1WZ1kjaVlq/view)
![Image of app2](https://drive.google.com/file/d/1uGNI4OzFQqtY7y7A0EA4_M_mNoCGYftc/view)

summary:
My app should function similarly to another popular application called Craiglist,but rather than multiple objects it should only be used to rent Instruments for people who have that extra guitar or  people who had never touched their bought drums. 
A person can make an account then login to that account.Onced login they can post instruments,for how many instrument they want to Rent out.The description should be used as price and Instrument condition.The user can edit and delete an instument they posted if they want to.Also a user doesn't have to make an account to see all Instruments all they have to do is browse the selections.

Tech:HTML,CSS,React,PostgressSQl,Nodejs

