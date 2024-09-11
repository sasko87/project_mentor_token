import React, { useState } from "react";
import "./search.css";
import Input from "../Input/Input";
import SearchIcon from "../../assets/admin-icons/search.png";

const Search = ({ placeholder }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div style={{ width: "60%", position: "relative" }}>
        <Input
          type="text"
          placeholder={`${placeholder}`}
          className="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <img
          src={SearchIcon}
          style={{ position: "absolute", top: 26, left: 10 }}
        />
      </div>
    </>
  );
};

export default Search;
