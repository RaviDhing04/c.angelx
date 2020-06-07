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
    onEdit
  } = props;

  const renderRow = (rowData, index) => {
    return (
      <tr key={index}>
        {tableKeys.map((key, index) => {
          return <td key={index}>{rowData[key].S}</td>;
        })}
        <td className="tableEditDelete">
          {showEdit ? <span onClick={()=>onEdit(rowData)}>Edit</span> : null}
          {showEdit && showDelete ? <span>|</span> : null}
          {showDelete ? <span onClick={()=>onDelete(rowData)}>Delete</span> : null}
        </td>
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
           {tableData.length ? <th>Actions</th> : null }
          </tr>
        </thead>
        <tbody>{tableData.map(rowData => renderRow(rowData))}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default TableComp;
