# Presentation

Renewable Data Store Api is an api that aims at exposing historial data.

##1 Setup the project
- npm install
- docker-compose up -d
- create a .env file with the following variables
- copy the contains of .env.dist to .env
- npm run import
- npm start

##2. Useful commands:
It exists different commands to launch the app :
- npm run start:dev : to launch the app, and rebuild every time a file has changed
- npm run start:debug : to launch the app, rebuild every time a file has changed, and use inspect mode
- npù run lint:fix: to fix eslint and prettier typos 

##3. Stack
- node
- express
- typescript
- eslint
- prettier
- mongoose
- jest plus supertest
- swagger


•	What type of backing database would you choose and why?

Advantages of sql database:
- transactions exist which give a stronger assurance in terms of consistency of data. Generally, we speak of ACID( Atomicity, Consistency, Isolation, and Durability)
- given each field has a type, there is a validation by database which a higher confidence in data

Disadvantages of sql:
- sql type database are not flexible when migrating
- sql type database don't scale up well when dealing with high volume of data in particular when sharing data among a cluster of database
- in addition, queries on multi-servers database with sql are hard to implement     
- better support for complex requests.

Advantages of nosql database:
- generally performance are higher with nosql
- implicit schema are handled with code with can be an advantage or disadvantage. Generally, it's an advantage as migration are easier as they are implemented with code.     
- higher availability Base. Generally, we summarise nosql with ( Basically Available, Soft state, Eventually Consistent)
- nosql bdd are generally open-source such as mongodb
- scale-up very well in a distributed database model

Disadvantages of nosql:
- transactions as described in sql don't exist but we can achieve a certain level of Atomicity and Isolation  
- complex queries are more difficult.

Two questions are in my opinion very important, in my opinion
1. Which volume of data do we expect. If the volume is very high and will need to split up the database in a distributed system. 
I would argue that nosql database is more relevant as it scales-up well and is designed to answer such problematic.
Moreover, there are some technic to maintain consistency among databases and sql won't be able to guarantee neither consistency. 

2. A key factor is the level of consistency required. Indeed there is a trade-off between availability and consistency. If consistency is preferred to availability, then a sql database is generraly a better choice

In the api, I selected a nosql database as I made the assumption that the level of data will be a high volume. I also made the assumption that there was no so much risk with consistency and solutions could be found when this risk would occurre.      


•	Describe the data structure or schema you would use in this database,

In a sql environment, I would have the following schema. Similarly, I used the same implicit schema with the nosql database

field | id       | Year     | Country  | nbCharge | nbVehicle
type  | integer  | integer  | string   | integer  | integer 


•	Why did you choose the language or framework you used, and what alternatives did you consider?

I choose node.js with typescript for those reasons:
- language oriented web and fits for a api
- higher performance thanks to v8 compared to other scripting languages like php, ruby, python 
- handle asynchrone and parallel requests
- good track record with an important community
- typescript adds static type system above javascript which is interested to increase, generally, code's quality
- there was no intense cpu taks in the api such as computation or encryption 
- language in which I am the most proficient

I choose express as a framework
- very well know framework backup by a large community
- high level of maintenance and popular in node's ecosystem

Other alternatives I consider:
- php with symfony as it provides integrated tools such as Api platform which diminishes the time needed to build an api
- symfony and php has a large community and is well integrate with any database
- non-type language though it has progressed with php large versions.
- php is less performance than node.js generally
- regarding frameworks, I considered other frameworks such as koa, nest.js which are very popular. 
- Koa looks very alike express as it is a forked, though it is less popular
- nest.js is interested but in my opinion, It was not needed given the size of the project. But it could be interesting.
 

•	How would the returned data be structured?

Type of the returned data would be the following ones:
RenewableData:
  type: object
  properties:
    aggregate:
      type: object
      properties:
        _id :
          type: string
        totalVehicle:
          type: integer
        totalCharger:
          type: integer
    results:
      type: array
      items:
        type: obbject
        properties:
          _id:
            type: string
          totalVehicle:
            type: integer
          totalCharger:
            type: integer
          country:
            type: string
          year:
            type: string

I added a swagger in the api to document it.


•	Imagine that we planned to extend the data set to include every country in the world and 20 more variables. 
What performance optimisations would you consider? 
Would you change anything about how the data is structured?

First, I think, one major optimisation is indexes. Indeed, we need to ask ourself what will be the most used queries to determine on which field to data indexes.
For example, I added indexes on Year and Country as I expected to be fields on which queries would be made.

Secondly, I would try to split up the data by domains. Let's say, some variables or data are related to historical renewable energy, I would keep them in one table. Let's say other variables are related to historical consumption of enery by country, I would create another table.
However, I would ask myself whether fronts or client would need to have consolidated data. Depending on these answer, I would try to gather data by domain. 

An optimization could be also to create different tables by Country and year and add a foreign key

Table: Country
field | id       | name 
type  | integer  | VarChar

Table: Year
field | id       | name 
type  | integer  | integer

Table : RenewableData
field | id       | #Year (foreign Key)  | #Country (foreign Key)  | nbCharge | nbVehicle
type  | integer  | integer              | integer                 | integer  | integer 


•	Imagine the authors are concerned about users scraping the entire data set from the API. What measures could you introduce to prevent this or make it more difficult?

In my opinion, there are various solution.
1. One could be that this api is private meaning that it is accessible only in a private network with api filter.
2. One could be to add authentification. This can go from very basic meaning adding .htacess to much complex with the usage of JWT.
3. Another solution could be to add roles in the authentification system. Certain request would be special rights to be allowed.  

