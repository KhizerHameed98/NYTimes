import React from "react";

const ToolBar = ({
  listBy,
  setListBy,
  listByEnum,
  toolChangeHandle,
  loading,
}) => {
  const hanlder = (value) => {
    if (!loading) {
      toolChangeHandle(value);
    }
  };
  return (
    <div className="dashboard-main-tool-bar" style={{ marginTop: "30px" }}>
      <div className="DR-new-tool-new-timeline">
        <ul
          className="DR-Cliam-nav-new-timeline"
          style={{ display: "inline-block" }}
        >
          <li
            //   className="DR-Cliam-nav-new-timeline-Active"
            className={
              listBy === listByEnum.All
                ? "DR-Cliam-nav-new-timeline-Active"
                : null
            }
            name={listByEnum.All}
            onClick={() => {
              hanlder(listByEnum.All);
            }}
          >
            <span>All</span>
          </li>
          <li
            className={
              listBy === listByEnum.World
                ? "DR-Cliam-nav-new-timeline-Active"
                : null
            }
            name={listByEnum.World}
            onClick={() => {
              hanlder(listByEnum.World);
            }}
          >
            <span to="">World</span>
          </li>

          <li
            className={
              listBy === listByEnum.Science
                ? "DR-Cliam-nav-new-timeline-Active"
                : null
            }
            name={listByEnum.Science}
            onClick={() => {
              hanlder(listByEnum.Science);
            }}
          >
            <span to="">Science</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToolBar;
