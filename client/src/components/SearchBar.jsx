import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.userData);
  const username = user?.userName || "User";

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      setIsLoading(true);
      setSearchStatus(""); // Reset status while loading
      const response = await axios.get("http://localhost:6969/notes/getFiles", {
        params: {
          title: searchQuery,
        },
      });

      const notes = response.data.data;
      if (notes.length > 0) {
        setSearchResults(notes);
        setSearchStatus("Found");
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.error("Error fetching notes: ", error.response?.data || error.message);
      setSearchStatus("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const showPDF = (fileName) => {
    window.open(`http://localhost:6969/files/${fileName}`, "_blank", "noreferrer");
  };

  return (
    <div className="h-heightWithoutNavbar flex flex-col items-center justify-start p-4 bg-[#D8D2C2]">
      {/* Greeting */}
      <h1 className="mb-4 text-lg font-bold text-gray-800">
        Hello, {username}! Search for your notes below.
      </h1>

      {/* Search Bar */}
      <div className="flex w-full items-center justify-center">
        <form
          className="w-full max-w-[700px] rounded-xl border border-black bg-[#4A4947] p-4"
          onSubmit={handleSearch}
        >
          <div className="flex items-center justify-between">
            <FaSearch className="text-2xl text-white" />
            <input
              type="search"
              placeholder="Search for Notes"
              className="ml-3 w-full bg-[#4A4947] text-white outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg bg-[#FAF7F0] px-4 py-2 text-sm font-medium text-black hover:bg-[#e8e5d9] focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && (
          <div className="col-span-full text-center text-gray-600">
            Loading...
          </div>
        )}

        {searchStatus === "Found" &&
          searchResults.map((note) => (
            <div
              key={note._id}
              className="flex w-full max-w-[300px] flex-col rounded-xl bg-[#374151] p-4 text-white shadow-lg"
            >
              <p className="mb-2 text-sm font-bold">File Name:</p>
              <p className="text-sm">{note.fileName}</p>
              <button
                onClick={() => showPDF(note.files)}
                className="mt-4 rounded-lg bg-[#FAF7F0] px-4 py-2 text-sm font-medium text-black hover:bg-[#e8e5d9]"
              >
                View PDF
              </button>
            </div>
          ))}

        {searchStatus === "Not-Found" && (
          <div className="col-span-full mt-4 text-center text-gray-600">
            No notes found. Try a different search query.
          </div>
        )}

        {searchStatus === "Error" && (
          <div className="col-span-full mt-4 text-center text-red-600">
            Something went wrong. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
