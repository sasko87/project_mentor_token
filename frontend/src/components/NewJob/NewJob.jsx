import React from "react";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import { TagsInput } from "react-tag-input-component";

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

          <Input
            className="input-create-new-job"
            type="text"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
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
