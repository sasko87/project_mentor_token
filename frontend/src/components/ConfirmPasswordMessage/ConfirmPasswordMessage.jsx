import React from "react";
import "./confirmPasswordMessage.css";

const ConfirmPasswordMessage = ({ isFocused, passwordsMatch }) => {
  return (
    isFocused && (
      <small className="confirm-password-message">
        {passwordsMatch ? (
          <span
            style={{
              color: "green",

              marginTop: 0,
            }}
          >
            Passwords Match
          </span>
        ) : (
          <span
            style={{
              color: "red",
              marginTop: 0,
            }}
          >
            * Confirm password is not the same as password
          </span>
        )}
      </small>
    )
  );
};
export default ConfirmPasswordMessage;
