import React, { useEffect } from "react";
import "./changePassword.css";
import { jwtDecode } from "jwt-decode";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { useState } from "react";

import PasswordCondition from "../../components/PasswordCondition/PasswordCondition";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ConfirmPasswordMessage from "../../components/ConfirmPasswordMessage/ConfirmPasswordMessage";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [samePasswords, setsSamePasswords] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [passwordHasOneNumberOrSymbol, setPasswordHasOneNumberOrSymbol] =
    useState(false);
  const [passwordHasEightCharacters, setPasswordHasEightCharacters] =
    useState(false);
  const [containsNameOrEmail, setContainsNameOrEmail] = useState(true);
  const [strongPassword, setStrongPassword] = useState(false);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;

  const checkPasswordConditions = (newPassword) => {
    const passwordRegexOneNumberOrSymbol =
      /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/;
    setPasswordHasOneNumberOrSymbol(
      passwordRegexOneNumberOrSymbol.test(newPassword)
    );

    const passwordRegexEightCharacters = /^.{8,}$/;
    setPasswordHasEightCharacters(
      passwordRegexEightCharacters.test(newPassword)
    );

    const lowerPassword = newPassword.toLowerCase();
    const emailPart = user.email.toLowerCase().split("@")[0];
    setContainsNameOrEmail(
      !lowerPassword.includes(emailPart) && newPassword.length > 5
    );

    setPasswordsMatch(newPassword === confirmPassword);

    setsSamePasswords(oldPassword === newPassword);

    setStrongPassword(
      passwordHasEightCharacters && passwordHasOneNumberOrSymbol
    );
  };

  useEffect(() => {
    checkPasswordConditions(newPassword);

    if (strongPassword && passwordsMatch && !samePasswords) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [
    newPassword,
    confirmPassword,
    strongPassword,
    passwordsMatch,
    passwordHasEightCharacters,
    passwordHasOneNumberOrSymbol,
    samePasswords,
  ]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    const data = {
      oldPassword,
      newPassword,
    };
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (err) {
      console.log(err);
      setError(
        "An error occurred during reseting the password. Please try again later."
      );
      console.error("An error occurred during sending the link:", err);
    }
  };

  return (
    <>
      <div className="change-password-container">
        <div className="change-password-text">
          <h2>Change your password </h2>
          <p>Enter your new password</p>
        </div>
        <form onSubmit={handleResetPassword} className="change-password-form">
          <Input
            label="Old Password"
            labelId="olg-password"
            id="old-password"
            type="password"
            placeholder="Old Password"
            className="change-password-input"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
          <div style={{ position: "relative" }}>
            <Input
              label="New Password"
              labelId="new-password"
              id="new-password"
              type="password"
              placeholder="New Password"
              className="change-password-input"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            {isFocused && samePasswords && (
              <small style={{ position: "absolute", top: 87 }}>
                <span
                  style={{
                    color: "red",

                    marginTop: 0,
                  }}
                >
                  * Old password cannot be the same as new password
                </span>
              </small>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <Input
              label="Confirm Password"
              labelId="confirm-password"
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              className="change-password-input"
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
            confirmPassword={confirmPassword}
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {successMessage && (
            <p style={{ color: "green", textAlign: "center" }}>
              {successMessage}
            </p>
          )}
          <Button
            disabled={disableButton}
            type="submit"
            label="Reset Password"
            className="change-password-button"
          />

          <p className="login-register-account">
            Don't know your password?
            <Link to="/forgot-password" className="link-login-register">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
