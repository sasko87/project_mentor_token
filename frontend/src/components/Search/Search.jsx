import React, { useState, useEffect } from "react";
import "./search.css";
import Input from "../Input/Input";
import SearchIcon from "../../assets/admin-icons/search.png";
import { useNavigate } from "react-router-dom";

const Search = ({ placeholder }) => {
  const user = window.mentorToken.user;
  const token = window.localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  console.log(results);

  useEffect(() => {
    const fetchData = async () => {
      if (!search.trim()) {
        setResults([]);
        return; // Exit the function early
      }
      let payload = {
        name: search,
      };
      let response;
      if (user.type === "mentor") {
        response = await fetch(
          `/api/search-startup?` + new URLSearchParams(payload).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (user.type === "startup") {
        response = await fetch(
          `/api/search-mentor?` + new URLSearchParams(payload).toString(),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    };

    if (search.trim()) {
      fetchData();
    } else {
      setResults([]); // Clear results when search input is empty
    }
  }, [search]);

  const handleViewMentor = (id) => {
    navigate(`/mentors/${id}`);
    setIsFocused(false);
    setSearch("");
  };

  const handleViewStartup = (id) => {
    navigate(`/jobfeed?` + new URLSearchParams({ companyId: id }).toString());
    setIsFocused(false);
    setSearch("");
  };

  const handleFocus = (e) => {
    e.preventDefault();
    setIsFocused(!isFocused);
  };

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
          onClick={handleFocus}
        />
        <img
          src={SearchIcon}
          style={{ position: "absolute", top: 26, left: 10 }}
        />
        {isFocused && (
          <div className="search-results">
            {results.length > 0 ? (
              <ul>
                {results.map((result) => (
                  <li
                    key={result._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                    }}
                    onClick={
                      user.type === "startup"
                        ? () => handleViewMentor(result._id)
                        : () => handleViewStartup(result._id)
                    }
                  >
                    {
                      <img
                        src={result.profileImage}
                        style={{ width: 30, height: 30, borderRadius: "50%" }}
                      />
                    }
                    <span>{result.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
