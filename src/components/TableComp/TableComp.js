import React from "react";
import { Table } from "react-bootstrap";
import "./TableComp.scss";

const TableComp = props => {
  const {
    tableData,
    tableHeader,
    tableKeys,
    onDelete,
    showDelete,
    showEdit,
    onEdit,
    editText,
    deleteText
  } = props;

  const renderRow = (rowData, index) => {
    return (
      <tr key={index}>
        {tableKeys.map((key, index) => {
          return <td key={index}>{rowData[key] && (rowData[key].S || rowData[key].S === "") ? rowData[key].S : rowData[key]}</td>;
        })}
        {showEdit || showDelete ? <td className="tableEditDelete">
          {showEdit ? <span onClick={() => onEdit(rowData)}>{editText}</span> : null}
          {showEdit && showDelete ? <span>|</span> : null}
          {showDelete ? <span onClick={() => onDelete(rowData)}> {deleteText} </span> : null}
        </td> : null}
      </tr>
    );
  };

  return (
    <React.Fragment>
      <Table bordered hover>
        <thead>
          <tr>
            {tableData.length > 0 && tableHeader.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            {tableData.length && (showEdit || showDelete) ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>{tableData.map(rowData => renderRow(rowData))}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default TableComp;
