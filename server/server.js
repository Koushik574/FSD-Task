const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
var cors = require('cors')

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200 
}


app.use(cors(corsOptions));

app.use(express.json());


const dbPath = path.join(__dirname, "StaffDetails.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/employee", async (request, response) => {
  const getEmployeeDataQuery = `
    SELECT
      *
    FROM
      Employee;`;
  const employeeData = await db.all(getEmployeeDataQuery);
  response.send(employeeData);
 
});

app.post("/employee/add", async (request, response) => {
  const employee = request.body;
  console.log(employee)
  const { name, Dept, Designation, Salary, dob, Address } = employee;
  const addEmployeeQuery = `
    INSERT INTO
      Employee (name, Dept, Designation, Salary, dob, Address)
    VALUES
      (
        '${name}',
        '${Dept}',
        '${Designation}',
        '${Salary}',
        '${dob}',
        '${Address}'
      );`;

  const dbResponse = await db.run(addEmployeeQuery);
  response.status(200).json({ data: dbResponse });
});

