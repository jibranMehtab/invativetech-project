import React, { useState } from "react";
import Api from "../components/Api";

export default function CreateNote() {
  const { http } = Api();
  const [title, setTitle] = useState();
  const [errorTitle, setErrorTitle] = useState();
  const [content, setContent] = useState();
  const [errorContent, setErrorContent] = useState();
  const [loader, setLoader] = useState("off");
  const submitForm = async () => {
    setLoader("on");

    try {
      const res = await http.post("/createNotes", { title, content });

      if (res.data.status === 422) {
        setErrorTitle(res.data.error.title);
        setErrorContent(res.data.error.content);
      } else if (res.data.status === 201) {
        alert("successfully created");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while creating the note. Please try again.");
    } finally {
      setLoader("off");
    }
  };
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">Create Note</h1>
        <div className="mb-3">
          <label for="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="text-danger">{errorTitle}</span>
        </div>
        <div className="mb-3">
          <label for="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <span className="text-danger">{errorContent}</span>
        </div>
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={submitForm}
        >
          {loader === "off" && <span>Submit</span>}
          {loader === "on" && (
            <center>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </center>
          )}
        </button>
      </div>
    </>
  );
}
