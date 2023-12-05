import React, { useState } from 'react';
import axios from 'axios';
import { useTable, usePagination } from "react-table";
import "./SubdivisionDisplay.css"
import { columns_ } from './columns';

export const SubdivisionDisplay = () => {
    
    const url = 'http://localhost:3001/subdivisions';

    const [data, setData] = useState([{}])

    const retrieveData = () => {
        let rows = undefined;

        axios.get(url, {
            params: {
              sortBy: "name"
            }
        })
        .then(function (response) {
            console.log(response.data.subdivisions);
            setData(response.data.subdivisions);
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {
            console.log("done")
        });  

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
            <br></br>
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
