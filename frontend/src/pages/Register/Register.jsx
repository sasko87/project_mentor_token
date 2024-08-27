import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";

const Register = () => {
  const [type, setType] = useState("mentor");
  const [registerStep, setRegisterStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [desc, setDesc] = useState("");
  const [position, setPosition] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const navigate = useNavigate();

  const handleContinueClick = (e) => {
    e.preventDefault();
    setRegisterStep(1);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      type,
      email,
      password,
      name: registerName,
      representative,
      address,
      phone,
      skills,
      desc,
      position,
      linkedin,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Registration Successfull");
        navigate("/login");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <>
      {registerStep === 0 && (
        <>
          <div className="component-register">
            <div className="register-text">
              <h2>Choose your account type </h2>
              <div className="register-type-selector">
                <label
                  htmlFor="mentorButton"
                  className={`mentorTypeSelect ${
                    type === "mentor" ? "active" : ""
                  }`}
                >
                  Mentor
                </label>
                <Input
                  type="radio"
                  name="type"
                  id="mentorButton"
                  value="mentor"
                  onChange={handleTypeChange}
                  className="register-type"
                />
                <label
                  htmlFor="startupButton"
                  className={`mentorTypeSelect ${
                    type === "startup" ? "active" : ""
                  }`}
                >
                  Startup
                </label>
                <Input
                  name="type"
                  type="radio"
                  id="startupButton"
                  value="startup"
                  onChange={handleTypeChange}
                  className="register-type"
                />
              </div>
            </div>

            <form className="register-form" onSubmit={handleRegister}>
              <Input
                type="email"
                placeholder="E-mail"
                className="register-input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                type="password"
                placeholder="Password"
                className="register-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="register-input"
              />

              <Button
                label="Continue"
                className="continue-button"
                clickFunction={(e) => handleContinueClick(e)}
              />
            </form>
            <p className="login-register-account">
              Already have account?{" "}
              <span>
                <Link to="/login" className="register-login-link">
                  Login
                </Link>
              </span>
            </p>
          </div>
        </>
      )}

      {registerStep === 1 && type === "startup" && (
        <>
          <div className="component-register">
            <div className="register-text">
              <h2>Setup Startup Account </h2>
            </div>

            <form className="register-form" onSubmit={(e) => handleRegister(e)}>
              <label htmlFor="startup-name">Startup Name</label>
              <Input
                id="startup-name"
                type="text"
                placeholder="My Startup Name"
                className="register-input"
                onChange={(e) => setRegisterName(e.target.value)}
                value={registerName}
              />
              <label htmlFor="representative">Legal Representative</label>
              <Input
                id="representative"
                type="text"
                placeholder="Name and surname"
                className="register-input"
                onChange={(e) => setRepresentative(e.target.value)}
                value={representative}
              />
              <label htmlFor="address">Registered Business Adrress</label>
              <Input
                id="address"
                type="text"
                placeholder="Registered Business Adrress"
                className="register-input"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <label htmlFor="invite">Invite Mentors via email</label>
              <Input
                id="invite"
                type="email"
                placeholder="Enter email adres to invite mentor"
                className="register-input"
              />

              <Button
                type="submit"
                label="Register"
                className="continue-button"
              />
            </form>
          </div>
        </>
      )}

      {registerStep === 1 && type === "mentor" && (
        <>
          <div className="component-register">
            <div className="register-text">
              <h2>Setup Mentor Account </h2>
            </div>

            <form className="register-form">
              <label htmlFor="mentor-name">Mentor Name</label>
              <Input
                id="mentor-name"
                type="text"
                placeholder="Name and surname"
                className="register-input"
                onChange={(e) => setRegisterName(e.target.value)}
                value={registerName}
              />
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                type="number"
                placeholder="Phone number"
                className="register-input"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <label htmlFor="skills">Skills</label>
              <TagsInput
                id="skills"
                value={skills}
                onChange={setSkills}
                className="register-input"
                placeHolder="press enter to add new skill"
                classNames="mentor-info-edit-input"
              />
              {/* <Input
                id="skills"
                type="text"
                placeholder="Skills"
                className="register-input"
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
              /> */}
              <label htmlFor="desc">Description</label>
              <Input
                id="desc"
                type="text"
                placeholder="Description"
                className="register-input"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
              <label htmlFor="position">Position</label>
              <Input
                id="position"
                type="text"
                placeholder="Position"
                className="register-input"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              />
              <label htmlFor="linkedin">LinkedIn</label>
              <Input
                id="linkedin"
                type="text"
                placeholder="LinkedIn Profile"
                className="register-input"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
              <Button
                type="submit"
                label="Register"
                className="register-button"
                clickFunction={(e) => handleRegister(e)}
              />
            </form>
            <p className="login-register-account">
              Already have account?{" "}
              <span>
                <Link to="/login" className="register-login-link">
                  Login
                </Link>
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
