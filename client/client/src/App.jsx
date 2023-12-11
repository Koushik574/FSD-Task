import { useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./axiosInstance";

function App() {

  const [name, setName] = useState();
  const [Dept, setDept] = useState();
  const [Designation, setDesignation] = useState();
  const [Salary, setSalary] = useState();
  const [dob, setDob] = useState();
  const [Address, setAddress] = useState();

  const [Data, setData] = useState([]);
  const [X, setX] = useState(false);


  useEffect(() => {
    fetchData();
  }, [X]);

  const fetchData = async () => {
    const res = await axiosInstance.get("/employee");
    console.log(res.data);
    setData(res.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setX(true);
    await axiosInstance.post("/employee/add", {
      name: name,
      Dept: Dept,
      Designation: Designation,
      Salary:Salary,
      dob: dob,
      Address: Address
    });
    
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          value={Dept}
          placeholder="Enter Dept"
          onChange={(e) => setDept(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          value={Designation}
          placeholder="Enter Designation"
          onChange={(e) => setDesignation(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          value={Salary}
          placeholder="Enter Salary"
          onChange={(e) => setSalary(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          value={dob}
          placeholder="Enter DOB"
          onChange={(e) => setDob(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          value={Address}
          placeholder="Enter Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br></br>
        <br></br>

        <button type="submit">Submit</button>
      </form>
      
      {Data.map((e) => {
        return (
          <>
          
            <div className="py-5 relative top-96 left-96" key={e.Name}>
            
              <p>{e.Name}</p>
              <p>{e.Dept}</p>
              <p>{e.Designation}</p>
              <p>{e.Salary}</p>
              <p>{e.DOB}</p>
              <p>{e.Salary}</p> 
            </div>
          </>
        );
      })}
    </>
  );
}

export default App;