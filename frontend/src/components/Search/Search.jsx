import React, { useState } from "react";
import "./search.css";
import Input from "../Input/Input";

const Search = ({ placeholder }) => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <>
      <Input
        type="text"
        placeholder={`${placeholder}`}
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
    </>
  );
};

export default Search;
