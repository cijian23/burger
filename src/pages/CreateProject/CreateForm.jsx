import React, { useState } from "react";
import TechItem from "./TechItem";
import TechStack from "./TechStack";
import axios from "./../../axios.js";
const CreateForm = () => {
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    githubLink: "",
    description: "",
    techStack: [],
    positionsNeeded: [],
  });

  const handleInputChange = function (e) {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("/api/v1/projects/create", formValues)
      .then((res) => {
        window.location = "/projects";
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  const handleRelocate = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const getStack = (stack, variant) => {
    if (variant == 1) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        techStack: stack,
      }));
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        positionsNeeded: stack,
      }));
    }
  };

  if (error !== "") {
    return <h1>{error}</h1>;
  }
  return (
    <div className="mt-[136px] mb-[370px] w-[100%] flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[100%] flex flex-col gap-y-[30px]"
      >
        <input
          type="text"
          name="name"
          placeholder="Repo Name"
          value={formValues.repoName}
          onChange={handleInputChange}
          className="md:w-[60%] w-[100%] sm:w-[80%] h-[36px] flex items-center pl-[25px] border border-gray-200 rounded-[68px] text-[14px] bg-blue-200 bg-opacity-50 bg-transparent mx-auto"
        />
        <input
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={formValues.githubLink}
          onChange={handleInputChange}
          className="md:w-[60%] w-[100%] sm:w-[80%] h-[36px] flex items-center pl-[25px] border border-gray-200 rounded-[68px] text-[14px] bg-blue-200 bg-opacity-50 bg-transparent mx-auto"
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={formValues.description}
          onChange={handleInputChange}
          className="resize-none md:w-[60%] w-[100%] sm:w-[80%] h-[150px] pl-[25px] pt-[15px] border border-gray-200 rounded-[30px] text-[14px] bg-blue-200 bg-opacity-50 bg-transparent mx-auto"
        />
        <TechStack getStack={getStack} variant={1} />
        <TechStack getStack={getStack} variant={2} />
        <div className="md:w-[60%] w-[100%] sm:w-[80%] h-[36px] mx-auto flex items-center justify-center gap-4">
          <button
            type="submit"
            className="w-[170px] h-[38px] flex items-center justify-center bg-[#5C469C] rounded-[29px] text-[20px] text-[##EEEEEE]"
          >
            Save
          </button>
          <button
            onClick={handleRelocate}
            className="w-[170px] h-[38px] flex items-center justify-center bg-transparent border border-gray-400 shadow-md rounded-[29px] text-[20px] text-[##EEEEEE]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
