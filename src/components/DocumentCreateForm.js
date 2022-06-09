import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { saveDocument } from "../redux/actions/documentActions";

const DocumentCreateForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(saveDocument({ name }));

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/documents" />;
  }

  return (
    <div className="card shadow">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold">Create Document</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentCreateForm;
