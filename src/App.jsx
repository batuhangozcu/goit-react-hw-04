import "./App.css";
import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const accessKey = "UvkdSCO3L1-nrgLCphJA9ZOBXj0ubpDbX5fqu4721nY";

  const fetchResults = async (searchQuery, newPage = 1) => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      query: searchQuery,
      page: newPage,
      orientation: "landscape",
      client_id: accessKey,
      per_page: 12,
    });

    try {
      const url = `https://api.unsplash.com/search/photos?${params}`;
      const response = await axios.get(url);

      if (newPage === 1) {
        setResults(response.data.results);
      } else {
        setResults((prevResults) => [...prevResults, ...response.data.results]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    fetchResults(newQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(query, nextPage);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={results} onSelectImage={setSelectedImage} />
      {loading && <Loader />}
      {results.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default App;
