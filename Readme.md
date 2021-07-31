<p align="center">
<img align="center" src="https://github.com/mohammad0-0ahmad/express-static-router/blob/main/logo.png?raw=true"/>
</p>
<br/><br/><br/>

### Installation:

```sh
npm i express-static-router
```

### Description:

Express Static Router is a middleware that makes it easy to implement static router in your express app based on a specified router folder's files structure.

---

<br/>

### Usage:

**1- Specify router folder and passing express app instance Inside your server file "main file":**

`Note! Router folder is a folder that contains all source code files that represent all routes.`

```javascript
import express from "express";
import staticRouter from "express-static-router";
const app = express();
.
.
.
.
.
staticRouter("./yourRouterFolder", app);

// OR to disable printing of detected routes.
staticRouter("./yourRouterFolder", app, { printDetectedRoutes :false });
```

**2- Create a route:**

Inside the provided router directory create js files named depending on route "endpoint" path.

Here are some examples that describe how to create a route:

- Example 1:
  To specify the home endpoint "/" you have to create index.js route file inside router directory.
  <br/>

- Example 2:
  Specifying the following route "/user" can be done by either by creating user.js route file inside router directory `OR` by creating index.js inside user folder that is created directly inside the provided router folder.
  <br/>

- Example 3:
  To define a route that can match all routes which starts with "/books/" create /books/[...].js. this will be equivalent to app.method("/books/\*") when using express router.

**3- Define requests handlers:**
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

**OR**

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

### Types:

**staticRouter parameters**

| Column A     | Column B                        |
| ------------ | ------------------------------- |
| routerFolder | Router folder relative path.    |
| app          | Express application instance.   |
| options      | An object to pass some options. |

**options type:**
An object can be used to pass optional options which affect middleware behavior:

| Property            | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| printDetectedRoutes | Boolean value that determines whether or not to print detected routes in the console.                                                 |
| onLoad              | A callback function that executes after loading all routes files <br/> This is helpful to apply some logic after defining all routes. |

**handler type:**

Exported handler can be either a function `OR` an object that receive the following properties:

| Property      | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| handler       | Handler function will be execute on demanding the related endpoint |
| paramsPattern | String can be used to specify route parameters order.specify       |
| middleware    | A function will be executed before executing handler function.     |

---

###More examples:
**1- Middleware checks a parameter value**
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
    get:{
      handler:getHandler,
      paramsPattern:"/:firstName/:lastName",
      middleware: isItJohn
      },
}

```

When visiting `/john/doe` will respond the following response:

`{ "firstName": "john", "lastName": "doe" }`

but when visiting `/doe/john` will return:

`Sorry you aren't John`

**2- Define not-found endpoint handler.**
Because of this middleware loads routes files asynchronously you need to pass similar logic inside onLoad property instead of having the logic underneath staticRouter implementation.

```javascript
import express from "express";
import staticRouter from "express-static-router";
const app = express();
.
.
.
.
.
staticRouter("./router", app, {
  onLoad: () => {
    app.use((req, res) => {
      res.status(404).send();
    });
  },
});
```

---
