import React, { useState } from 'react';
import axios from 'axios';
import { useTable, usePagination } from "react-table";
import "./SubdivisionDisplay.css"
import { columns_ } from './columns';

export const SubdivisionDisplay = () => {
    
    const url = 'http://localhost:3001/subdivisions';

    const [data, setData] = useState([{}])

    const [sscFilterActive, setSscFilterActive] = useState(false)
    const [sscFilterFuture, setSscFilterFuture] = useState(false)
    const [sscFilterBuiltout, setSscFilterBuiltout] = useState(false)

    const [sortBy, setSortBy] = useState("")

    const getFilterParam = () => {
        let filterArray = [];

        if (sscFilterActive) filterArray.push("Active");
        if (sscFilterFuture) filterArray.push("Future");
        if (sscFilterBuiltout) filterArray.push("Builtout");

        return filterArray;
    }

    const retrieveData = () => {
        let rows = undefined;

        let filterParam = getFilterParam();
        console.log(filterParam);
        console.log("sortBy: " + sortBy);

        if(filterParam.length > 0 || sortBy != ""){
            axios.post(url, {
                statusCode: filterParam,
                sortBy: sortBy
            })
            .then(function (response) {
                console.log(response.data.subdivisions);
                setData(response.data.subdivisions);
            })
            .catch(function (error) {
                console.error(error);
            })
        }
        else{
            axios.get(url, {
                params: {
                    statusCode: filterParam,
                    sortBy: sortBy
                }
            })
            .then(function (response) {
                console.log(response.data.subdivisions);
                setData(response.data.subdivisions);
            })
            .catch(function (error) {
                console.error(error);
            })
        }
        
        return rows
    }

    const resetData = () => {
        setData([{}]);
    }

    const tableInstance = useTable({
        columns: columns_,
        data: data as any
    }, usePagination) 

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        // @ts-ignore
        page,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        pageOptions,
        state,
        prepareRow 
    } = tableInstance

    // @ts-ignore
    const { pageIndex } = state;

    return (
        <div id="container">

            <label>Filter data by Subdivision Status Code: </label>
            <br></br>
            <input type="checkbox" value="Active" onChange={(e) => setSscFilterActive(e.target.checked) }/>
            <label>Active</label>
            <br></br>
            <input type="checkbox" onChange={(e) => setSscFilterFuture(e.target.checked) }/>
            <label>Future</label>
            <br></br>
            <input type="checkbox" onChange={(e) => setSscFilterBuiltout(e.target.checked) }/>
            <label>Builtout</label>
            <br></br><br></br>

            <label>Sort data by: </label>
            <input type="radio" name="sortby" value="name" onChange={(e) => setSortBy(e.target.value) }/>Name
            <input type="radio" name="sortby" value="nearMapImageDate" onChange={(e) => setSortBy(e.target.value) }/>Near Map Image Date
            <input type="radio" name="sortby" value="" onChange={(e) => setSortBy(e.target.value) } />None
            <br></br><br></br>

            <button onClick={retrieveData}>Retrieve Data</button> <span> </span>
            <button onClick={resetData}>Reset Data</button>
            <br></br><br></br>
            <span>Page {pageIndex + 1} of {pageOptions.length} </span>
            <button onClick={previousPage}>Previous Page</button><span> </span>
            <button onClick={nextPage}>Next Page</button>
            <br></br><br></br>

            <table {...getTableProps()}>
                <thead>
                    { 
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    );
};
