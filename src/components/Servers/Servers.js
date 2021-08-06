import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { orderBy } from 'lodash';






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
                    render: (text, dataSource) => <li><a style={{ color: "#1890ff" }} onClick={() => this.onClickEdit(dataSource)}><EditOutlined /></a>
                    <a style={{ color: "#1890ff" }} onClick={(e) => { if (window.confirm('Are you sure want to Delete?')) this.deleteServer(dataSource) }}><DeleteOutlined theme="filled" /></a></li>

                },

            ]
        }
    }
    componentWillMount() {
        API.get('servers')
            .then((response) => {
            const filteredDetails = orderBy(response.data.filter(data => data.Active === 1),'id','desc');
                this.setState({ rows: filteredDetails});
                console.log("check", this.state.rows);
            });
    }

    addServer = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        const id = uuidv4();
        const { serverName, serverId, location, dbCount, comments } = this.state;
        const request = {
            id,
            serverName,
            serverId,
            location,
            dbCount,
            comments,
            Active:1
        };
        API.post('servers', request)
            .then((response) => {
                console.log("response", response);
                this.setState({
                    modal: !this.state.modal
                });
                alert("Added")
                window.location.reload();

            });
    };
    deleteServer = (dataSource) => {
        const request = {
          "Active": 0
        }
        API.put(`servers/${dataSource.id}`, request)
          .then((response) => {
            console.log("response", response);
                window.location.reload();
          });
      }
    render() {
        return (
            <ContentWrapper>

                <Container fluid>
                    <Table columns={this.state.columns} dataSource={this.state.rows} bordered />

                </Container>
                <CardFooter className="text-center">
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }} onClick={this.addServer}>Add Server</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} backdrop="static">
                        <ModalHeader toggle={this.toggleModal}><h4>Add Server</h4></ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Server Name</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.serverName} onChange={(e) => this.setState({ serverName: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>

                                <div className="form-group">
                                    <label>Server ID</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.serverId} onChange={(e) => this.setState({ serverId: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Location</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>DB Count</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.dbCount} onChange={(e) => this.setState({ dbCount: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Comments</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.comments} onChange={(e) => this.setState({ comments: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <Button color="primary" type="submit" style={{ marginRight: 10 }}>Ok</Button>

                                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                            </form>
                        </ModalBody>
                    </Modal>
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Edit Selected</button>
                    {/* <button type="submit" className="btn btn-info" style={{ marginRight: 10 }}>Delete Selected</button> */}

                </CardFooter>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Servers);