import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUP = ({ api }) => {
  const [userName, userNamechange] = useState("");
  const [fullName, fullNamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [country, setCountry] = useState("Cameroon");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("male");
  const [wallet, setWallet] = useState(0);
  const [city, setCity] = useState("");
  const [role, setRole] = useState("user");


  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (userName === null || userName === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (fullName === null || fullName === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = {
      userName,
      fullName,
      password,
      email,
      phone,
      country,
      city,
      address,
      gender,
      wallet,
      role,
    };
    if (IsValidate()) {
      //console.log(regobj);
      fetch(`${api}/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };


const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value !== "other") {
      setCustomValue(""); // Reset input if another option is selected
      setCountry(value)
    }
  };

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };

  useEffect(()=>{
    if(customValue.trim()){
        setCountry(customValue) //store input
    }
  })
  
  console.log({country})
  //     var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // var raw = JSON.stringify({
  //   "email": "new@gmail.com",
  //   "password": "mypassfgdgfd"
  // });

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // fetch("http://localhost:5000/signup", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  return (
    <div style={{marginTop:"90px"}}>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={userName}
                      onChange={(e) => userNamechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => passwordchange(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => fullNamechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone <span className="errmsg"></span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => phonechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      City <span className="errmsg">*</span>
                    </label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country <span className="errmsg">*</span>
                    </label>
                    <select
                      value={selectedValue}
                      onChange={handleSelectChange}
                      className="form-control"
                    >
                      <option value="Cameroon">Cameroon</option>
                      <option value="Nigeia">Nigeria</option>
                      <option value="other">Country ?</option>
                    </select>
                    {selectedValue === 'other' &&(
                        <div style={{position:"relative", display:"flex",alignItems:"center", marginLeft:"100px"}}>
                        <input style={{position:"absolute", top:"-38px", background:"",borderBlockStart:"2px solid green",borderBlockEnd:"2px solid green", outline:"red"}}
                         value={customValue}
                         placeholder="Enter your Country"
                         onChange={handleCustomInputChange}
                          className="form-control"
                        ></input>
                      
                      </div>
                    )}
                    
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => addresschange(e.target.value)}
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={(e) => genderchange(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check"
                    ></input>
                    <label>Male</label>
                    <input
                      type="radio"
                      checked={gender === "female"}
                      onChange={(e) => genderchange(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check"
                    ></input>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>{" "}
            </div>
            <div className="card-footer">
            <p>Already have an account?</p>
              <Link to="/SignIN" className="btn btn-primary" state={{marginRight:"80%"}}>
                LogIn
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUP;
