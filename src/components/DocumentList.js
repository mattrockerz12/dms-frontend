import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDocuments } from "../redux/actions/documentActions";
import Pagination from "react-js-pagination";
import moment from "moment";

const DocumentList = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.dms.documents);
  const meta = useSelector((state) => state.dms.meta);
  const [filters, setFilters] = useState({
    page: 1,
  });

  useEffect(() => {
    dispatch(loadDocuments(filters));
  }, [filters]);

  const handlePageChange = (pageNumber) => {
    setFilters({
      ...filters,
      page: pageNumber,
    });
  };

  return (
    <>
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">Documents</h3>
        <a
          className="btn btn-primary btn-sm d-none d-sm-inline-block"
          role="button"
          href="#"
        >
          <i className="fa-solid fa-plus"></i>&nbsp;Add Document
        </a>
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
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Document Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
                  <tr key={index}>
                    <td>{document.name}</td>
                    <td>{moment(document.created_at).format("MMM Do YY")}</td>
                    <td>
                      <span className="badge bg-success">
                        {document.document_count}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Name</td>
                  <td>Date Added</td>
                  <td>Document Count</td>
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

export default DocumentList;
