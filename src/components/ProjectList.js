import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, removeProject } from "../redux/actions/projectActions";
import Pagination from "react-js-pagination";
import moment from "moment";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const projects = useSelector((state) => state.dmsProj.projects);
  const meta = useSelector((state) => state.dmsProj.meta);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    page: 1,
  });

  useEffect(() => {
    dispatch(loadProjects(filters));
  }, [filters]);

  const handlePageChange = (pageNumber) => {
    setFilters({
      ...filters,
      page: pageNumber,
    });
  };

  const handleDelete = (project) => {
    dispatch(removeProject(project));
  };

  return (
    <>
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">Projects</h3>
        <Link
          className="btn btn-primary btn-sm d-none d-sm-inline-block"
          role="button"
          to="/projectform"
        >
          <i className="fa-solid fa-plus"></i>&nbsp;Add Project
        </Link>
      </div>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Projects Info</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 text-nowrap">
              <div
                id="dataTable_length"
                className="dataTables_length"
                aria-controls="dataTable"
              >
                <label className="form-label">
                  Show&nbsp;
                  <select className="d-inline-block form-select form-select-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  &nbsp;
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="text-md-end dataTables_filter"
                id="dataTable_filter"
              >
                <label className="form-label">
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    aria-controls="dataTable"
                    placeholder="Search"
                  />
                </label>
              </div>
            </div>
          </div>
          <div
            className="table-responsive table mt-2"
            id="dataTable"
            role="grid"
            aria-describedby="dataTable_info"
          >
            <table className="table my-0" id="dataTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Related Document Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>
                      <a href={`/projects/${project.id}`}>{project.name}</a>
                    </td>
                    <td>
                      {moment(project.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success">
                        {project.document_count}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <Link
                          className="btn btn-primary"
                          to={`/projectform/${project.id}`}
                        >
                          <i className="fa-solid fa-file-pen"></i>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(project)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Name</td>
                  <td>Date Added</td>
                  <td>Related Document Count</td>
                  <td>Actions</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="row">
            <div className="col-md-6 align-self-center">
              <p
                id="dataTable_info"
                className="dataTables_info"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 10 of 27
              </p>
            </div>
            <div className="col-md-6">
              <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                <Pagination
                  activePage={meta.current_page}
                  totalItemsCount={parseInt(meta.total, 10)}
                  itemsCountPerPage={meta.per_page}
                  itemClass="page-item"
                  linkClass="page-link"
                  onChange={(pageNumber) => handlePageChange(pageNumber)}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
