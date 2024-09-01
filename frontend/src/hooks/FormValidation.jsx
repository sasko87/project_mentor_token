import React from "react";

const FormValidation = ({
  registerName,
  representative,
  address,
  phone,
  desc,
  position,
  skills,
  setFormErrors,
  type,
}) => {
  const errors = {};
  if (!registerName) errors.registerName = "Name is required";
  if (type === "mentor") {
    if (!phone) errors.phone = "Phone is required";
    if (!desc) errors.desc = "Description is required";
    if (!position) errors.position = "Position is required";
    if (!skills || skills.length === 0) errors.skills = "Skills is required";
  } else if (type === "startup") {
    if (!representative || representative.length === 0)
      errors.representative = "Representative is required";
    if (!address) errors.address = "Address is required";
  }

  // Add other field validations as needed

  setFormErrors(errors);
  return Object.keys(errors).length === 0; // Return true if no errors};
};
export default FormValidation;
