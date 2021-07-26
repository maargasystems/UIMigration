import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress, CardFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';
import { Table } from 'antd';




class Servers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {


            columns: [
                {
                    title: 'Select',
                    render: (text, dataSource) => <input type="checkbox" ></input>
                },
                {
                    dataIndex: 'serverName',
                    title: 'Server Name',
                    sorter: (a, b) => a.serverName - b.serverName,
                    sortDirections: ['descend', 'ascend'],

                },

                {
                    dataIndex: 'serverId',
                    title: 'Server ID',
                    sorter: (a, b) => a.serverId - b.serverId,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'location',
                    title: 'Location',
                },
                {
                    dataIndex: 'dbCount',
                    title: 'DB Count',
                },
                {
                    dataIndex: 'comments',
                    title: 'Comments',
                },
                {
                    title: 'Actions',
                },

            ]
        }
    }
    componentWillMount() {
        API.get('servers')
            .then((response) => {
                this.setState({ rows: response.data });
                console.log("check", this.state.rows);

            });
    }

    // rowGetter = (i) => this.state.rows[i]

    // handleGridSort = (sortColumn, sortDirection) => {
    //     const comparer = (a, b) => {
    //       if (sortDirection === 'ASC') {
    //         return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
    //       } else if (sortDirection === 'DESC') {
    //         return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
    //       }
    //     };

    //     const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    //     this.setState({ rows });
    // };


    render() {
        return (
            <ContentWrapper>

                <Container fluid>
                    {/* <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.rows.length}
                //         rowSelection={{
                // showCheckbox: true,
                //         }}
                        // minHeight={700} 
                        /> */}
                    <Table columns={this.state.columns} dataSource={this.state.rows} bordered />

                </Container>
                <CardFooter className="text-center">
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Add Server</button>
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Edit Selected</button>
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Delete Selected</button>

                </CardFooter>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Servers);