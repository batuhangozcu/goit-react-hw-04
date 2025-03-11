import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/search.svg";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    onSearch(inputValue);
  };

  return (
    <header className={styles.searchBar}>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for images..."
        />
        <button type="submit">
          <img src={searchIcon} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
