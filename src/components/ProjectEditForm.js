import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { getDocuments } from "../redux/actions/documentActions";
import { editProject } from "../redux/actions/projectActions";

const ProjectEditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.dms.documents);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/projects/${id}`
      );

      setName(data.data.name);
      setSelected(data.data.documents.map((d) => d.id));
    })();
    dispatch(getDocuments());
  }, []);

  const handleCheck = (id) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log({
      name,
      documents: selected,
    });

    dispatch(editProject({ name, documents: selected }, id));

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="card shadow">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold">Edit Project</p>
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
            <div className="form-check">
              {documents.map((document) => (
                <div className="form-check form-check-inline" key={document.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={document.id}
                    checked={selected.some((s) => s === document.id)}
                    onChange={() => handleCheck(document.id)}
                  />
                  <label className="form-check-label">{document.name}</label>
                </div>
              ))}
            </div>
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

export default ProjectEditForm;
