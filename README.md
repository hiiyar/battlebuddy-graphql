# Battle Buddy - GraphQL

## How to use

Clone the repository and execute the script below

```sh
$ npm install 
$ node src/app.js
``` 

Go to your browser and type address [http://localhost:5000/graphql](http://localhost:5000/graphql)

## Samples 

* Get a specific User

```sh
{
   user(id:"#1"){
      id
      name
      email
   }
}
```

* Get all Users

```sh
{
   users{
      id
      name
      email
   }
}
```

* Get specific User and your Lootboxes (with status)

```sh
{
  user(id:"#1"){
    id
    name
    lootboxes{
      status
      lootbox{
        id
        name
      }
    }
  }
}
```

* Get specific LootBox and Users (with status)

```sh
{
  lootbox(id:"#1"){
    id
    name
    users {
      status
      user {
        id
        name
      }
    }
  }
}
```