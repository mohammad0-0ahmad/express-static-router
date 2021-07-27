<h1 align="center"> Express Static Router</h1>
<p align="center">
<img align="center" src="https://github.com/mohammad0-0ahmad/express-static-router/blob/main/logo.png?raw=true"/>
</p>

---

### Installation:

```sh
npm i express-static-router
```

### Description:

Express Static Router is a middleware that makes it easy to implement static routers in your express app based on files structure that can be found inside a a specified router folder.

---

### Usage

#####1- Specify router folder and passing express app instance Inside your server file:

```javascript
import express from "express";
import staticRouter from "express-static-router";
.
.
.
.
.
staticRouter("./yourRouterFolder", app);
```

#####2- Create a route:

Inside the provided router directory create js files named depending on route "endpoint" path.

Example 1:
To specify the home endpoint "/" you have to create index.js route file inside router directory.

Example 2:
Specifying the following route "/user" can be done by either by creating user.js route file inside router directory OR by creating index.js inside user folder that is created directly inside the provided router folder.

Example 3:
To define a route that can match all routes which starts with "/books/" create /books/[...].js. this will be equivalent to app.method("/books/\*") when using express router.

#####3- Define requests handlers:
After creating route file you have to export your requests handlers depending on request method.

Example:

```javascript

// Will handle GET requests.
export const get = (req, res) => {
  res.send("Welcome to express static router.");
};

// Will handle POST requests.
export const post = (req, res) => {
  res.send("Welcome to express static router.");
};
.
.
.
.
.
```

OR

```javascript

// Will handle GET requests.
const getHandler = (req, res) => {
  res.send("Welcome to express static router.");
};

// Will handle POST requests.
const postHandler = (req, res) => {
  res.send("Welcome to express static router.");
};

.
.
.
.
.
export default {
    get:getHandler,
    post:postHandler,
}
```

---

#### Handler type:

Exported handler can be either a function or an object that receive the following properties:

| Property      | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| handler       | Handler function will be execute on demanding the related endpoint |
| paramsPattern | String can be used to specify route parameters order.specify       |
| middleware    | A function will be executed before executing handler function.     |

---

###### More examples:

Let's guess that we have inside router folder the following index.js route file:

```javascript
// function that checks if first params is equals to john
const isItJohn = (req, res, next) => {
  if (req.params.firstName.toLowerCase() === "john") {
    next();
  } else {
    res.send("Sorry you aren't John");
  }
};
// Will handle GET requests.
const getHandler = (req, res) => {
  res.send(req.res.params);
};
.
.
.
.
.
export default {
    get:{handler:getHandler,paramsPattern:"/:firstName/:lastName"},
}

```

When visiting `/john/doe` will respond the following response:

```json
{
  "firstName": "john",
  "lastName": "doe"
}
```

but when visiting `/doe/john` will return:

```html
Sorry you aren't John
```
---
