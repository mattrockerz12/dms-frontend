import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProjectDetail } from "../redux/actions/projectActions";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.dmsProj.projects);

  useEffect(() => {
    dispatch(loadProjectDetail(id));
  }, []);

  return (
    <>
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">Project Details</h3>
        <Link
          className="btn btn-primary btn-sm d-none d-sm-inline-block"
          role="button"
          to="/documentform"
        >
          <i className="fa-solid fa-plus"></i>&nbsp;Add Document
        </Link>
      </div>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Documents Info</p>
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
                  <th>Details</th>
                  <th>Revision Count</th>
                  <th>Latest Upload By</th>
                  <th>Latest Date Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>
                      <Link to="/uploadlist">{project.document.name}</Link>
                    </td>
                    <td>{project.project_document_detail_count}</td>
                    <td>{project.latest_upload_by_date}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Details</td>
                  <td>Revision Count</td>
                  <td>Latest Upload By</td>
                  <td>Latest Date Uploaded</td>
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
              <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers"></nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
