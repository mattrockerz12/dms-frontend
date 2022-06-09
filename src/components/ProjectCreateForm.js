import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getDocuments } from "../redux/actions/documentActions";
import { saveProject } from "../redux/actions/projectActions";

const ProjectCreateForm = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.dms.documents);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("name");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
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

    dispatch(saveProject({ name, documents: selected }));

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="card shadow">
      <div className="card-header py-3">
        <p className="text-primary m-0 fw-bold">Create Project</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
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

export default ProjectCreateForm;
