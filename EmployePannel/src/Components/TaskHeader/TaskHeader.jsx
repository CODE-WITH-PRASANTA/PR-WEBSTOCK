import React from "react";
import "./TaskHeader.css";

import {
  FiHome,
  FiChevronRight,
} from "react-icons/fi";

const TaskHeader = () => {
  return (
    <section className="TaskHeader">

      <div className="TaskHeader__left">
        <h1 className="TaskHeader__title">My Tasks</h1>
      </div>

      <div className="TaskHeader__right">

        <div className="TaskHeader__breadcrumb">

          <FiHome className="TaskHeader__icon" />

          <FiChevronRight className="TaskHeader__arrow" />

          <span className="TaskHeader__link">
            Employee
          </span>

          <FiChevronRight className="TaskHeader__arrow" />

          <span className="TaskHeader__active">
            My Tasks
          </span>

        </div>

      </div>

    </section>
  );
};

export default TaskHeader;