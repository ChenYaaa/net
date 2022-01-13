import React from "react";
import RecordListItem from "../recordListItem/RecordListItem";
// import { useEffect } from "react";

const RecordList = ({ username, record, search, searchRecord }) => {
  return (
    <div className="recordList">
      {search === true ? (
        <>
          <div className="movieBox">
            {searchRecord.map((item, i) => (
              <RecordListItem item={item} key={i} username={username} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="movieBox">
            {record.map((item, i) => (
              <RecordListItem item={item} key={i} username={username} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecordList;
