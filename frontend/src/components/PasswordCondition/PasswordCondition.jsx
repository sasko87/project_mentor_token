import React from "react";
import "./passwordCondition.css";
import { HiOutlineXMark } from "react-icons/hi2";
import { HiOutlineCheck } from "react-icons/hi2";
const PasswordCondition = ({
  isFocused,
  passwordsMatch,
  strongPassword,
  passwordHasEightCharacters,
  passwordHasOneNumberOrSymbol,
  containsNameOrEmail,
}) => {
  return (
    <>
      {isFocused && (
        <small>
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
              Confirm password is not the same as password
            </span>
          )}
        </small>
      )}

      <div>
        <p className="password-check">
          {strongPassword ? <HiOutlineCheck /> : <HiOutlineXMark />}
          Password Strength : {strongPassword ? "Strong" : "Weak"}
        </p>

        <p className="password-check">
          {containsNameOrEmail ? <HiOutlineCheck /> : <HiOutlineXMark />} Cannot
          contain your email address
        </p>

        <p className="password-check">
          {passwordHasEightCharacters ? <HiOutlineCheck /> : <HiOutlineXMark />}
          At least 8 characters
        </p>
        <p className="password-check">
          {passwordHasOneNumberOrSymbol ? (
            <HiOutlineCheck />
          ) : (
            <HiOutlineXMark />
          )}
          Contains a number or symbol
        </p>
      </div>
    </>
  );
};

export default PasswordCondition;
