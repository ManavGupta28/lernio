import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UploadNote = () => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Get user data from Redux store
  const user = useSelector((state) => state.user.userData);
  const userId = user?.user?._id;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setFile(null);
  };

  const submitFile = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);
      formData.append("uploadedBy", userId);

      const response = await axios.post(
        "http://localhost:6969/notes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response: ", response.data);
      alert("Notes uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error("Failed to upload notes: ", error.response?.data || error.message);
      alert("Failed to upload notes. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      className="flex h-full w-full max-w-[770px] flex-col items-center justify-start p-5 md:border md:border-gray-300 lg:justify-center"
      onSubmit={submitFile}
    >
      <h1 className="mb-5 text-2xl font-black">Upload Your Notes</h1>
      
      {/* Title Input */}
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Description Input */}
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Tags Input */}
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          required
          onChange={(e) => setTags(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* File Upload Input */}
      <div className="flex w-full max-w-[550px] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to Upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF</p>
            <input
              type="file"
              accept="application/pdf"
              required
              id="dropzone-file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        className="my-5 w-full max-w-[550px] rounded-xl bg-[#4A4947] py-3 font-bold text-white hover:bg-[#B17457] disabled:opacity-50"
        type="submit"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default UploadNote;
