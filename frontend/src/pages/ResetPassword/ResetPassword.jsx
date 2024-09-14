import React, { useEffect } from "react";
import "./resetPassword.css";
import { jwtDecode } from "jwt-decode";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { useState } from "react";
import { useParams } from "react-router-dom";
import PasswordCondition from "../../components/PasswordCondition/PasswordCondition";

const ResetPassword = () => {
  const { id, token } = useParams();
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

  const user = jwtDecode(token);
  console.log(user);

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

    setStrongPassword(
      passwordHasEightCharacters && passwordHasOneNumberOrSymbol
    );
  };

  useEffect(() => {
    checkPasswordConditions(newPassword);

    if (strongPassword && passwordsMatch) {
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
  ]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    const data = {
      password: newPassword,
      id,
      token,
    };
    try {
      const res = await fetch(`/api/reset-password/${id}/${token}`, {
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
        setNewPassword("");
        setConfirmPassword("");
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
      <div className="component-login">
        <div className="login-text">
          <h2>Reset your password </h2>
          <p>Enter your new password</p>
        </div>
        <form onSubmit={handleResetPassword} className="login-form">
          <Input
            label="New Password"
            labelId="new-password"
            id="new-password"
            type="password"
            placeholder="New Password"
            className="login-input"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <Input
            label="Confirm Password"
            labelId="confirm-password"
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
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
          {successMessage && (
            <p style={{ color: "green", textAlign: "center" }}>
              {successMessage}
            </p>
          )}
          <Button
            disabled={disableButton}
            type="submit"
            label="Reset Password"
            className="login-button"
          />
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
