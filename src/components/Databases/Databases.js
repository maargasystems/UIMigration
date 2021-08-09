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
                render: (text, dataSource) => <li><a style={{ color: "#1890ff" }} onClick={() => this.onClickEdit(dataSource)}><EditOutlined /></a>
                <a style={{ color: "#1890ff" }} onClick={(e) => { if (window.confirm('Are you sure want to Delete?')) this.deleteDatabase(dataSource) }}><DeleteOutlined theme="filled" /></a></li>
            },
            
        ]
    }

    }
    componentWillMount() {
        API.get('databases')
        .then((response) => {
          const filteredDetails = orderBy(response.data.filter(data => data.Active === 1),'id','desc');
          this.setState({rows:filteredDetails});
          console.log("check",this.state.rows);

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
        const { databaseName, databaseId, serverId, docCount, size,Comment } = this.state;
        const request = {
            id,
            databaseName,
            databaseId,
            serverId,
            docCount,
            size,
            Comment,
            Active:1
        };
        API.post('databases', request)
            .then((response) => {
                console.log("response", response);
                this.setState({
                    modal: !this.state.modal
                });
                alert("Added")
                window.location.reload();

            });
    };
    deleteDatabase = (dataSource) => {
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
                    <Table columns={this.state.columns} dataSource={this.state.rows} 
        bordered />

                </Container>
                <CardFooter className="text-center">
                    <button type="submit" className="btn btn-info" style={{ marginRight: 10 }} onClick={this.addServer}>Add Server</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} backdrop="static">
                        <ModalHeader toggle={this.toggleModal}><h4>Add Databases</h4></ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Database Name</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.databaseName} onChange={(e) => this.setState({ databaseName: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>

                                <div className="form-group">
                                    <label>Database ID</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.databaseId} onChange={(e) => this.setState({ databaseId: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Server ID</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.serverId} onChange={(e) => this.setState({ serverId: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>DOC Count</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.docCount} onChange={(e) => this.setState({ docCount: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>size</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.size} onChange={(e) => this.setState({ size: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <div className="form-group">
                                    <label>Comments</label><span className="text-danger">*</span>
                                    <input type="text" value={this.state.Comment} onChange={(e) => this.setState({ Comment: e.target.value })} maxlength="25" className="form-control" required></input>
                                </div>
                                <Button color="primary" type="submit" style={{ marginRight: 10 }}>Ok</Button>

                                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                            </form>
                        </ModalBody>
                    </Modal>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Edit Selected</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Delete Selected</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Bulk Import</button>

                </CardFooter>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Databases);