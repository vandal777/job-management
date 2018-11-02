import React, { Component } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: "Make",        
                    field: "make", 
                    checkboxSelection: true
                },
                {headerName: "Model", field: "model"},
                {headerName: "Price", field: "price"}

            ],
            rowData: [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
            ]
        }
    }
    componentDidMount() {
        fetch('https://api.myjson.com/bins/ly7d1')
        .then(result => result.json())
        .then(rowData => this.setState({rowData}))
    }

    render() {
        return (
                <div className="ag-theme-balham" style={{height: '500px', width: '600px' }} >
                    <button onClick={this.onButtonClick}>Get selected rows</button>
                    <AgGridReact
                        onGridReady={ params => this.gridApi = params.api }
                        rowSelection="multiple"
                        enableSorting={true}
                        enableFilter={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
            );
    }
    onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()  
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`) 
    }
}

export default App;
