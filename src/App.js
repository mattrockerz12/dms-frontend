import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DocumentList from "./components/DocumentList";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import ProjectList from "./components/ProjectList";
import Register from "./components/Register";
import DocumentCreateForm from "./components/DocumentCreateForm";
import ProjectCreateForm from "./components/ProjectCreateForm";
import DocumentEditForm from "./components/DocumentEditForm";
import ProjectEditForm from "./components/ProjectEditForm";
import ActivityLog from "./components/ActivityLog";
import ProjectDetails from "./components/ProjectDetails";
import ProjectUploadList from "./components/ProjectUploadList";

const App = () => {
  const handleToggle = () => {
    var sidebar = document.querySelector(".sidebar");
    var collapseEl = sidebar.querySelector(".collapse");
    var collapseElementList = [].slice.call(
      document.querySelectorAll(".sidebar .collapse")
    );
    var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return;
    });

    document.body.classList.toggle("sidebar-toggled");
    document.querySelector(".sidebar").classList.toggle("toggled");

    if (document.querySelector(".sidebar").classList.contains("toggled")) {
      for (var bsCollapse of sidebarCollapseList) {
        bsCollapse.hide();
      }
    }
  };

  return (
    <div id="wrapper">
      <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div className="container-fluid d-flex flex-column p-0">
          <Link
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
            to="/"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fa-solid fa-book"></i>
            </div>
            <div className="sidebar-brand-text mx-3">
              <span>DMS</span>
            </div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="profile.html">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                <i className="fa-solid fa-file"></i>
                <span>Projects</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/documents">
                <i className="fa-solid fa-folder-plus"></i>
                <span>Documents</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="table.html" to="/activitylog">
                <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                <span>Activity Log</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login.html">
                <i className="far fa-user-circle"></i>
                <span>Login</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="register.html">
                <i className="fas fa-user-circle"></i>
                <span>Register</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Nav handleToggle={handleToggle} />
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activitylog" element={<ActivityLog />} />
              <Route path="/documentform/:id" element={<DocumentEditForm />} />
              <Route path="/documentform" element={<DocumentCreateForm />} />
              <Route path="/documents" element={<DocumentList />} />
              <Route path="/projectform/:id" element={<ProjectEditForm />} />
              <Route path="/projectform" element={<ProjectCreateForm />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/uploadlist" element={<ProjectUploadList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
