import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress, CardFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';
import { Table } from 'antd';




class Groups extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            columns: [
                {
                    title: 'Select',
                    render: (text, dataSource) => <input type="checkbox" ></input>
                },
                {
                    dataIndex: 'groupName',
                    title: 'Group Name',

                },

                {
                    dataIndex: 'groupdescription',
                    title: 'Group Description',

                },
                {
                    dataIndex: 'dbCount',
                    title: 'DB Count',
                    sorter: (a, b) => a.dbCount - b.dbCount,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    dataIndex: 'totalSize',
                    title: 'Total Size',
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
        API.get('groups')
            .then((response) => {
                this.setState({ rows: response.data });
                console.log("check", this.state.rows);
            });
    }


    render() {
        return (
            <ContentWrapper>

                <Container fluid>
                    <Table columns={this.state.columns} dataSource={this.state.rows} bordered />
                </Container>
                <CardFooter className="text-center">
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Add Group</button>
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Edit Selected</button>
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Delete Selected</button>

                </CardFooter>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Groups);