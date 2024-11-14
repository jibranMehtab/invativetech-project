import React, { useState, useEffect } from "react";
import Notes from "../components/Notes";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

export default function Home({ searchQuery }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState("off");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const notesPerPage = 5;

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setCurrentNote(id);
    setShowDeleteModal(true);
  };

  const handleUpdateNote = async (updatedNote) => {
    console.log(updatedNote);
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${updatedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      setNotes(updatedNotes);
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      // Send DELETE request to the Laravel API
      const response = await fetch(`http://localhost:8000/api/notes/${id}`, {
        method: "DELETE", // DELETE method to delete a note
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Update the state to remove the deleted note
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes); // Remove the note from the local state
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      setError(error.message); // Handle errors if delete fails
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoader("on");
        const response = await fetch("http://localhost:8000/api/notes"); // URL of your Laravel API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        console.log(data.data);
        if (Array.isArray(data.data)) {
          setNotes(data.data); // Update state with fetched data
        } else {
          setError("Data format is incorrect, expected an array.");
        }
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoader("off");
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentPageNotes = filteredNotes.slice(
    indexOfFirstNote,
    indexOfLastNote
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1 className="text-center">Notes</h1>
      {loader === "off" && (
        <>
          {error && <p className="text-danger">{error}</p>}{" "}
          <Notes
            notes={currentPageNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <EditModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            note={currentNote}
            onUpdate={handleUpdateNote}
          />
          {/* Delete Modal */}
          <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            note={currentNote}
            onDelete={handleDeleteNote}
          />
        </>
      )}
      {loader === "on" && (
        <center>
          <span
            className="spinner-border spinner spinner-border-lg"
            role="status"
            aria-hidden="true"
          ></span>
        </center>
      )}

      {/* Pagination Controls */}
      <div className="pagination-container text-center mt-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-primary me-2"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-primary me-2 ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-primary ms-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
