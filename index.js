const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');

const express = require('express')
const app = express()
const port = 3000

const engine = require('ejs-mate');
app.engine('ejs', engine);


const methodOverride = require('method-override')
app.use(methodOverride('_method'));



app.use(express.urlencoded({ extended: true }));
//ejs module

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'db_app',
  password: '@Vadher01'
});


const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

//Home page route
app.get("/", (req, res) => {
  let q = "Select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in db");
  }
});

//show user route
app.get("/user", (req, res) => {
  let q = "Select * from user";
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log("Successful");


      res.render("showusers.ejs", { users });
      // res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in db");
  }

});


//Edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in db");
  }
  // console.log(id);
  // res.render("edit.ejs");

});

//Update route

/*
--> First Search the user based on the Query
--> Check if the password is same 
--> Update user
*/
app.patch("/user/:id", (req, res) => {

  let { id } = req.params;
  let { formPass: pass, newName: NewUser } = req.body;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (pass != user.password) {
        res.send("Wrong Password ");
      } else {
        let q2 = `update user set username='${NewUser}' where id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) {
            console.log("Something is wrong");
          };
          res.redirect("/user");
        })
      }
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in db");
  }
});

const { v4: uuidv4 } = require('uuid');
app.post("/user", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;

  console.log("post");
  let q = `insert into user (id,username,email,password) values (?,?,?,?)`;


  try {
    connection.query(q, [id, username, email, password], (err, result) => {
      if (err) throw err
      console.log("Inserted user:", result);
      res.redirect("/user");
    })
  } catch (err) {
    console.log(err);
  }
});


//Delete post
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in db");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { FormEmail: checkEmail, FormPass: checkPass } = req.body;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (checkPass != user.password && checkEmail != user.email) {
        res.send("Wrong Password & email");
      } else {
        let q2 = `delete from user where id='${user.id}'`;
        connection.query(q2, (err, result) => {
          if (err) {
            console.log("Something is wrong");
          };
          res.redirect("/user");
        })
      }
    });
  } catch (err) {
    console.log(err);
    res.render("Some error in db");
  }
});



let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};




/*
let q = "insert into user(id,user,email,password) values ?";
let data = [];
for (let i = 0; i <= 1000; i++) {
  data.push(createRandomUser());
}
*/


// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err
//     console.log(result);
//   });

// } catch (err) {
//   console.log(err);
// }

// connection.end();