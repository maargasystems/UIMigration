import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress,CardFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';
import { Table } from 'antd';




class Databases extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {   
        columns : [
            {
                title: 'Select',
                render: (text, dataSource) => <input type="checkbox" ></input>
            },
            {
                dataIndex: 'databaseName',
                title: 'DatabaseName',

            },
            
            {
                dataIndex: 'databaseId',
                title: 'Database ID',

            },
            {
                dataIndex: 'serverId',
                title: 'Server ID',
                sorter: (a, b) => a.serverId - b.serverId,
                sortDirections: ['descend', 'ascend'],

            },
            {
                dataIndex: 'docCount',
                title: 'DocCount',
                sorter: (a, b) => a.docCount - b.docCount,
                sortDirections: ['descend', 'ascend'],

            },
            {
                dataIndex: 'size',
                title: 'Size',
            },
            {
                dataIndex: 'comment',
                title: 'Comment',
            },
            {
                title: 'Actions',
            },
            
        ]
    }

    }
    componentWillMount() {
        API.get('databases')
        .then((response) => {
          this.setState({rows:response.data});
          console.log("check",this.state.rows);

        });
      }

    render() {
        return (
            <ContentWrapper>
               
                <Container fluid>
                <Table columns={this.state.columns} dataSource={this.state.rows} bordered />
                    
                </Container>
                <CardFooter className="text-center">
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Add Database</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Edit Selected</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Delete Selected</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Bulk Import</button>

                                </CardFooter>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Databases);