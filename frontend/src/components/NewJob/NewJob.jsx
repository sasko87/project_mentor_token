import React from "react";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import "./newJob.css";

const NewJob = ({
  title,
  setJobTitle,
  jobTitle,
  setSkillsRequired,
  skillsRequired,
  setJobDescription,
  jobDescription,
  clickFunction,
  category,
  setCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const jobCategories = [
    "Software Developer",
    "Engineering",
    "Marketing",
    "Design",
    "Sales",
    "Customer Support",
    "Other",
  ];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <h2 className="create-new-job-title">{title}</h2>

        <form action="" className="create-new-job-form">
          <Input
            className="input-create-new-job"
            type="text"
            placeholder="title"
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
          />

          <TagsInput
            value={skillsRequired}
            onChange={setSkillsRequired}
            placeHolder="Press enter to add new skill"
            classNames="input-create-new-job"
          />

          <div className="input-create-new-job dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {category || "Select a category"}
              <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
                ▼
              </span>
            </div>
            {isOpen && (
              <ul className="dropdown-list">
                {jobCategories.map((category, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <Input
            className="input-create-new-job"
            type="text"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          /> */}

          <Textarea
            placeholder="Job Description"
            className="input-create-new-job textarea-create-new-job"
            onChange={(e) => setJobDescription(e.target.value)}
            value={jobDescription}
          />

          <Button
            className="button-submit-new-job"
            label="Create Job"
            clickFunction={clickFunction}
          />
        </form>
      </div>
      ;
    </>
  );
};

export default NewJob;
