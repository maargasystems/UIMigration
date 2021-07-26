import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';
import { Table } from 'antd';




class SingleView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            columns: [
                {
                    dataIndex: 'batchName',
                    title: 'Batch(batch name)',
                    sorter: (a, b) => a.batchName - b.batchName,
                    sortDirections: ['descend', 'ascend'],

                },
                {
                    dataIndex: 'noOfDBs',
                    title: 'No Of DBs',
                    sorter: (a, b) => a.noOfDBs - b.noOfDBs,
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    dataIndex: 'dataSize',
                    title: 'Data Size',
                    sorter: (a, b) => a.dataSize - b.dataSize,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'docCount',
                    title: 'Doc Count',
                    sorter: (a, b) => a.docCount - b.docCount,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'start',
                    title: 'Start',
                    sorter: (a, b) => a.start - b.start,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'finish',
                    title: 'Finish',
                    sorter: (a, b) => a.finish - b.finish,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'errors',
                    title: 'Errors',
                    sorter: (a, b) => a.errors - b.errors,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'err',
                    title: '% Err',
                    sorter: (a, b) => a.err - b.err,
                    sortDirections: ['descend', 'ascend'],
                },
            ]
        }

    }
    componentWillMount() {
        API.get('posts')
            .then((response) => {
                this.setState({ rows: response.data });
                console.log("check", this.state.rows);

            });
    }



    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Migration Progress
                    </div>
                </div>
                <Container fluid>
                    <Table columns={this.state.columns} dataSource={this.state.rows} bordered />
                </Container>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(SingleView);