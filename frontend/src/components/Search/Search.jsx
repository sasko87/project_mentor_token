import React, { useState } from "react";
import "./search.css";
import Input from "../Input/Input";

const Search = ({ placeholder }) => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <>
      <div style={{ width: "60%" }}>
        <Input
          type="text"
          placeholder={`${placeholder}`}
          className="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>
    </>
  );
};

export default Search;
