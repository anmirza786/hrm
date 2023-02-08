import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import { REQUEST_URL } from "../redux/constantURL";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { deletebook } from "../redux/actions/bookActions";
import React, { useEffect, useMemo, useRef, useState } from "react";

function AGGridAdmin({ state, deletebook }) {
  const [deleted, setdeleted] = useState(false);
  function EditButton(props) {
    function btnClickedHandler() {
      deletebook(props.data._id);
      setdeleted(true);
    }
    return <button onClick={btnClickedHandler}>Delete Me!</button>;
  }
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [categoryData, setcategoryData] = useState();
  let newrowData = [];
  const [columnDefs] = useState([
    { field: "bookname", filter: true },
    {
      field: "author",
      filter: "agSetColumnFilter",
      filterParams: {
        applyMiniFilterWhileTyping: true,
      },
    },
    {
      field: "category",
      filter: "agSetColumnFilter",
      filterParams: {
        applyMiniFilterWhileTyping: true,
      },
    },
    {
      field: "published",
      filter: "agSetColumnFilter",
      filterParams: {
        applyMiniFilterWhileTyping: true,
      },
    },
    {
      field: "actions",
      cellRenderer: EditButton,
      cellRendererParams: {
        clicked: function (field) {
          alert(`${field} was clicked`);
        },
      },
    },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );
  function getalldata() {
    let data = [];
    rowData.forEach((d) => {
      categoryData.forEach((cat) => {
        if (d.category === cat._id) {
          let newdata = {};
          if (state.isAuthenticated) {
            newdata = {
              _id: d._id,
              bookname: d.bookname,
              author: d.author,
              category: cat.category_name,
              published: d.published.split("T")[0],
            };
          } else if (!state.isAuthenticated) {
            newdata = {
              _id: d._id,
              bookname: d.bookname,
              author: d.author,
              category: cat.category_name,
              published: d.published.split("T")[1],
            };
          }
          data.push(newdata);
        }
      });
    });
    newrowData = data;
  }
  useEffect(() => {
    fetch(REQUEST_URL + "books/getallbooks/")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
    fetch(REQUEST_URL + "books/get-all-categories")
      .then((result) => result.json())
      .then((rows) => setcategoryData(rows));
  }, [deleted]);

  return (
    <div>
      {rowData && categoryData && getalldata()}
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          pagination={true}
          rowData={newrowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="single"
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, { deletebook })(AGGridAdmin);
