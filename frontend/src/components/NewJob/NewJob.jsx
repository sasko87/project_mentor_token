import React from "react";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
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
}) => {
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

          <Input
            className="input-create-new-job"
            type="text"
            placeholder="Required Skills"
            onChange={(e) => setSkillsRequired(e.target.value)}
            value={skillsRequired}
          />

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
