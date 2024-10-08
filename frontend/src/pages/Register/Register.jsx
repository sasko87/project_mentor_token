import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import FormValidation from "../../hooks/FormValidation";
import userImage from "../../assets/user.png";
import startupImage from "../../assets/startup-register-image.png";
import photoImage from "../../assets/photo.png";
import PasswordCondition from "../../components/PasswordCondition/PasswordCondition";
import { createRef } from "react";
import ConfirmPasswordMessage from "../../components/ConfirmPasswordMessage/ConfirmPasswordMessage";

const Register = () => {
  const [type, setType] = useState("mentor");
  const [registerStep, setRegisterStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [disabledContinue, setDisabledContinue] = useState(true);
  const [registerName, setRegisterName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [desc, setDesc] = useState("");
  const [position, setPosition] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);
  const [passwordHasOneNumberOrSymbol, setPasswordHasOneNumberOrSymbol] =
    useState(false);
  const [passwordHasEightCharacters, setPasswordHasEightCharacters] =
    useState(false);
  const [containsNameOrEmail, setContainsNameOrEmail] = useState(true);
  const [strongPassword, setStrongPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [uploadImage, setUploadImage] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const fileInput = createRef();

  const checkPasswordConditions = (password) => {
    const passwordRegexOneNumberOrSymbol =
      /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/;
    setPasswordHasOneNumberOrSymbol(
      passwordRegexOneNumberOrSymbol.test(password)
    );

    const passwordRegexEightCharacters = /^.{8,}$/;
    setPasswordHasEightCharacters(passwordRegexEightCharacters.test(password));

    const lowerPassword = password.toLowerCase();
    const emailPart = email.toLowerCase().split("@")[0];
    setContainsNameOrEmail(
      !lowerPassword.includes(emailPart) && password.length > 5
    );

    setPasswordsMatch(password === confirmPassword);

    setStrongPassword(
      containsNameOrEmail &&
        passwordHasEightCharacters &&
        passwordHasOneNumberOrSymbol
    );
  };

  useEffect(() => {
    checkPasswordConditions(password);

    if (strongPassword && passwordsMatch) {
      setDisabledContinue(false);
    } else {
      setDisabledContinue(true);
    }
  }, [
    password,
    confirmPassword,
    strongPassword,
    passwordsMatch,
    passwordHasEightCharacters,
  ]);

  const handleContinueClick = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const res = await fetch("/api/auth/register-check-existing-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setRegisterStep(1);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const handleTypeChange = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setUploadImage(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFile(reader.result);
    };
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFormErrors({});

    const isFormValid = FormValidation({
      type,
      setFormErrors,
      registerName,
      representative,
      address,
      phone,
      skills,
      desc,
      position,
      termsChecked,
    });

    if (!isFormValid) {
      return;
    }

    try {
      let imagePath = "";
      if (uploadImage) {
        let formData = new FormData();
        formData.set("document", uploadImage);
        formData.set("email", email);
        const image = await fetch("/api/upload", {
          method: "POST",
          "Content-Type": "multipart/form-data",
          body: formData,
        });
        if (image.ok) {
          const data = await image.json();

          imagePath = data.localhost;
        }
      }

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
        profileImage: imagePath,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        const errorData = await res.json();
        setFormErrors({ server: errorData.error });
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      setFormErrors({
        server: "An error occurred while registering. Please try again.",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
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
                label="Email"
                type="email"
                placeholder="E-mail"
                className="register-input register-input-step-one"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                className="register-input register-input-step-one"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div style={{ position: "relative" }}>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  className="register-input register-input-step-one"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <ConfirmPasswordMessage
                  isFocused={isFocused}
                  passwordsMatch={passwordsMatch}
                />
              </div>
              <PasswordCondition
                isFocused={isFocused}
                passwordsMatch={passwordsMatch}
                strongPassword={strongPassword}
                passwordHasEightCharacters={strongPassword}
                passwordHasOneNumberOrSymbol={passwordHasOneNumberOrSymbol}
                containsNameOrEmail={containsNameOrEmail}
              />
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}

              <Button
                disabled={disabledContinue}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="register-upload-image-container">
                  <label
                    htmlFor="file-upload"
                    className="register-upload-label"
                  >
                    {file ? (
                      <img src={preview} className="uploaded-image-preview" />
                    ) : (
                      <>
                        <img src={startupImage} alt="User Icon" />
                        <img
                          src={photoImage}
                          alt="Camera Icon"
                          className="register-upload-photo"
                        />
                      </>
                    )}
                  </label>
                  <input
                    name="document"
                    type="file"
                    id="file-upload"
                    onChange={handleFileUpload}
                    ref={fileInput}
                    accept="image/jpeg, image/png, image/pjpeg, image/gif"
                  />
                </div>
              </div>
              {/* <label htmlFor="startup-name">Startup Name</label> */}
              <Input
                label="Startup Name"
                labelId="startup-name"
                id="startup-name"
                type="text"
                placeholder="My Startup Name"
                className="register-input"
                onChange={(e) => setRegisterName(e.target.value)}
                value={registerName}
                isRequired={true}
              />
              {formErrors.registerName && (
                <p className="error-text">{formErrors.registerName}</p>
              )}

              <Input
                label="Legal Representative"
                labelId="representative"
                id="representative"
                type="text"
                placeholder="Name and surname"
                className="register-input"
                onChange={(e) => setRepresentative(e.target.value)}
                value={representative}
                isRequired={true}
              />
              {formErrors.representative && (
                <p className="error-text">{formErrors.representative}</p>
              )}
              {/* <label htmlFor="address">Registered Business Adrress</label> */}
              <Input
                label="Registered Business Adrress"
                labelId="address"
                id="address"
                type="text"
                placeholder="Registered Business Adrress"
                className="register-input"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                isRequired={true}
              />
              {formErrors.address && (
                <p className="error-text">{formErrors.address}</p>
              )}

              <Input
                label="Invite Mentors via email"
                labelId="invite"
                id="invite"
                type="email"
                placeholder="Enter email address to invite mentor"
                className="register-input"
                isRequired={false}
              />
              {error && (
                <span style={{ color: "red", textAlign: "center" }}>
                  {error}
                </span>
              )}
              {successMessage && (
                <p style={{ color: "green", textAlign: "center" }}>
                  {successMessage}
                </p>
              )}
              <Button
                type="submit"
                label="Register"
                className="continue-button"
              />
              <div className="terms-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value={termsChecked}
                  onClick={(e) => setTermsChecked(e.target.value)}
                />
                <label htmlFor="terms">
                  By signing up to create an account I accept Company’s{" "}
                  <Link
                    className="link-login-register"
                    style={{ fontSize: 10 }}
                  >
                    Terms of use & Privacy Policy.
                  </Link>
                </label>
                {formErrors.termsChecked && (
                  <p className="error-text">{formErrors.termsChecked}</p>
                )}
              </div>
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
              {/* <label htmlFor="mentor-name">Mentor Name</label> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="register-upload-image-container">
                  <label
                    htmlFor="file-upload"
                    className="register-upload-label"
                  >
                    {file ? (
                      <img src={preview} className="uploaded-image-preview" />
                    ) : (
                      <>
                        <img src={userImage} alt="User Icon" />
                        <img
                          src={photoImage}
                          alt="Camera Icon"
                          className="register-upload-photo"
                        />
                      </>
                    )}
                  </label>
                  <input
                    name="document"
                    type="file"
                    id="file-upload"
                    onChange={handleFileUpload}
                    ref={fileInput}
                    accept="image/jpeg, image/png, image/pjpeg, image/gif"
                  />
                </div>
              </div>

              <Input
                label="Mentor Name"
                labelId="mentor-name"
                id="mentor-name"
                type="text"
                placeholder="Name and surname"
                className="register-input"
                onChange={(e) => setRegisterName(e.target.value)}
                value={registerName}
                isRequired={true}
              />
              {formErrors.registerName && (
                <p className="error-text">{formErrors.registerName}</p>
              )}
              {/* <label htmlFor="phone">Phone</label> */}
              <Input
                label="Phone"
                labelId="phone"
                id="phone"
                type="number"
                placeholder="Phone number"
                className="register-input"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                isRequired={true}
                onKeyDown={handleKeyDown}
              />
              {formErrors.phone && (
                <p className="error-text">{formErrors.phone}</p>
              )}
              <label htmlFor="skills" style={{ paddingLeft: 20 }}>
                Skills <span className="required">*</span>
              </label>
              <TagsInput
                id="skills"
                value={skills}
                onChange={setSkills}
                className="register-input"
                placeHolder="press enter to add new skill"
                classNames="mentor-info-edit-input"
                style={{ marginBottom: "10px" }}
              />
              {formErrors.skills && (
                <p className="error-text">{formErrors.skills}</p>
              )}

              {/* <label htmlFor="desc">Description</label> */}
              <Input
                label="Description"
                labelId="desc"
                id="desc"
                type="text"
                placeholder="Description"
                className="register-input"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                isRequired={true}
              />
              {formErrors.desc && (
                <p className="error-text">{formErrors.desc}</p>
              )}
              {/* <label htmlFor="position">Position</label> */}
              <Input
                label="Position"
                labelId="position"
                id="position"
                type="text"
                placeholder="Position"
                className="register-input"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                isRequired={true}
              />
              {formErrors.position && (
                <p className="error-text">{formErrors.position}</p>
              )}
              {/* <label htmlFor="linkedin">LinkedIn</label> */}
              <Input
                label="LinkedIn"
                labelId="linkedin"
                id="linkedin"
                type="text"
                placeholder="LinkedIn Profile"
                className="register-input"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
              {successMessage && (
                <p style={{ color: "green", textAlign: "center" }}>
                  {successMessage}
                </p>
              )}
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
