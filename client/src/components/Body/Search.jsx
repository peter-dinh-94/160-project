import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <>
      <form className="search-form">
        <input type="search" placeholder="Search..."></input>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
