import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
    const [dataset, setDataset] = useState([]);
    const [filteredDataset, setFilteredDataset] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [tableReady, setTableReady] = useState(false);
    const pageSize = 10;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (tableReady) {
            addNewData(filteredDataset, currentPage);
        }
    }, [filteredDataset, currentPage, tableReady]);

    useEffect(() => {
        const table = document.getElementById("csie");
        if (table) {
            setTableReady(true);
        }
    }, []);

    async function fetchData() {
        try {
            const response = await fetch("https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&categorymethod=doFindTypeJ&category=6");
            const data = await response.json();
            setDataset(data);
            setFilteredDataset(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function deleteRows() {
        const table = document.getElementById("csie").getElementsByTagName('tbody')[0];
        let rowCount = table.rows.length;
        while (rowCount > 0) {
            table.deleteRow(0);
            rowCount = table.rows.length;
        }
    }

    function addNewData(data, pageNumber) {
        deleteRows();
        const table = document.getElementById("csie").getElementsByTagName('tbody')[0];

        const startIndex = pageNumber * pageSize;
        const endIndex = Math.min(startIndex + pageSize, data.length);

        for (let i = startIndex; i < endIndex; i++) {
            const rowData = data[i];
            const row = table.insertRow(-1);
            row.insertCell(0).innerHTML = rowData.title;
            row.insertCell(1).innerHTML = rowData.showInfo[0].location;
            row.insertCell(2).innerHTML = rowData.showInfo[0].price;
        }

        updatePage(data);
    }

    function previousPage() {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    }

    function nextPage() {
        const maxPage = Math.ceil((filteredDataset ? filteredDataset.length : dataset.length) / pageSize) - 1;
        setCurrentPage(prevPage => Math.min(prevPage + 1, maxPage));
    }

    function updatePage() {
        const present = document.getElementById("present");
        const totalItems = filteredDataset ? filteredDataset.length : dataset.length;
        present.innerHTML = (currentPage + 1) + '/' + Math.ceil(totalItems / pageSize);
    }

    function search(event) {
        const keyword = event.target.value.trim().toLowerCase();
        const filteredData = dataset.filter(item =>
            item.title.toLowerCase().includes(keyword) ||
            item.showInfo[0].location.toLowerCase().includes(keyword) ||
            item.showInfo[0].price.toLowerCase().includes(keyword)
        );
        setFilteredDataset(filteredData);
        setCurrentPage(0);
    }

    return (
        <div>
            <h1>景點觀光展覽資訊 <input id="search" type="text" onChange={search} /></h1>
            <table id="csie">
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>地點</th>
                        <th>票價</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <button onClick={previousPage}>上一頁</button>
            <span id="present"></span>
            <button onClick={nextPage}>下一頁</button>
        </div>
    );
}
export default App;
