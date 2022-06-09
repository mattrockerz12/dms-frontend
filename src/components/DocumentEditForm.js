import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editDocument } from "../redux/actions/documentActions";

const DocumentEditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/documents/${id}`
      );
      setName(data.data.name);
    })();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(editDocument({ name }, id));

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/documents" />;
  }

  return (
    <div className="row">
      <div className="col-8">
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 fw-bold">Edit Document</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={name}
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
      </div>
    </div>
  );
};

export default DocumentEditForm;
