const Notes = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4 mb-4" key={note.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => onEdit(note.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notes;
