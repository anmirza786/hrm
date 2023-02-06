import {connect} from "react-redux"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles//ag-grid.css';
import { REQUEST_URL } from '../redux/constantURL';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { deletebook } from '../redux/actions/bookActions';
import React, { useEffect, useMemo, useRef, useState } from 'react';



function AGGridAdmin({state,deletebook}) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState();
    // const [newrowData, setnewRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [categoryData, setcategoryData] = useState(); // Set rowData to Array of Objects, one Object per Row
    let newrowData=[];
    // Each Column Definition results in one Column.
    const [columnDefs] = useState([
      {field: 'bookname', filter: true},
      {
        field: 'author',
        filter: 'agSetColumnFilter',
        filterParams: {
          applyMiniFilterWhileTyping: true,
        },
        },
      {
        field: 'category', 
        filter: 'agSetColumnFilter',
        filterParams: {
          applyMiniFilterWhileTyping: true,
      },
      },
      {
        field: 'published', 
        filter: 'agSetColumnFilter',
        filterParams: {
          applyMiniFilterWhileTyping: true,
      },
      }
    ]);
   
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true
      }),[]);
   
    // Example of consuming Grid Event
    // const cellClickedListener = useCallback( event => {
    //   console.log('cellClicked', event);
    // }, []);
   function getalldata(){
        let data = []
        rowData.forEach(d=>{
            categoryData.forEach(cat=>{
                if(d.category === cat._id){
                    // console.log(cat)
                    let newdata = {}
                    if (state.isAuthenticated)
                    {newdata = {
                        _id: d._id,
                        bookname: d.bookname,
                        author: d.author,
                        category: cat.category_name,
                        published: d.published.split('T')[0]
                    }
                }
                    else if (!state.isAuthenticated){
                        newdata = {
                            _id: d._id,
                            bookname: d.bookname,
                            author: d.author,
                            category: cat.category_name,
                            published: d.published.split('T')[0]
                        }
                }
                data.push(newdata)
                }
            })
        })
        // console.log(data)
        newrowData=data
        // return data
    }
    // Example load data from sever
    useEffect(() => {
      fetch(REQUEST_URL + 'books/getallbooks/')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
      fetch(REQUEST_URL + 'books/get-all-categories')
      .then(result=>result.json())
      .then(rows=>setcategoryData(rows))
      
    }, []);
    
   
    return (
      <div>
   
        {rowData && categoryData && getalldata()}
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{height: 500}}>
   
          <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              pagination={true}
              rowData={newrowData} // Row Data for Rows
              
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
            
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection='single' // Options - allows click selection of rows
   
            //   onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              />
        </div>
      </div>
    );
}
const mapStateToProps = (state) => ({
    state: state,
  });
export default connect(mapStateToProps,{deletebook})(AGGridAdmin);