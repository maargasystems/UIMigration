import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';
import { Table } from 'antd';
import { Tree } from 'antd';
import { Row, Col, Input, Card, CardHeader, CardBody, CardFooter, CustomInput } from 'reactstrap';





class TreeData extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            treeData: [
                   
                        {
                            title: 'Columns',
                            key: '0-0-0',
                            // disabled: true,
                            children: [
                                {
                                    title: 'leaf',
                                    key: 'leaf',
                                    // disableCheckbox: true,
                                },
                                {
                                    title: 'leaf',
                                    key: 'sss',
                                },
                            ],
                        },
                        {
                            title: 'Sampled Items',
                            key: 'sam',
                            children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: 'samp' }],
                        },
                        {
                            title: 'Database Items',
                            key: 'dat',
                            children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: 'data' }],
                        },
                        {
                            title: 'Doco_Form_Notes',
                            key: 'doco',
                            children:
                             [
                                {
                                    title: 'Attach',
                                    key: 'Attach',
                                    // disableCheckbox: true,
                                },
                                {
                                    title: 'Category',
                                    key: 'Category',
                                },
                                {
                                    title: 'Details',
                                    key: 'Details',
                                },
                                {
                                    title: 'Doc Readers',
                                    key: 'DocReaders',
                                },
                                
                                {
                                    title: 'Icon',
                                    key: 'Icon',
                                },
                                {
                                    title: 'LastBy',
                                    key: 'LastBy',
                                },
                                {
                                    title: 'LastUpdated',
                                    key: 'LastUpdated',
                                },
                                {
                                    title: 'PublishStatus',
                                    key: 'PublishStatus',
                                },
                                {
                                    title: 'RolesType',
                                    key: 'RolesType',
                                },
                                {
                                    title: 'Title',
                                    key: 'Title',
                                },
                                {
                                    title: 'Type',
                                    key: 'Type',
                                },
                                ],
                        },
                    ],
            
                    columns: [
                        {
                            dataIndex: 'destination',
                            title: 'Destination',
                        },
                        {
                            dataIndex: 'category',
                            title: 'Category',
                        },
        
                       
                    ],
                    // columns1:[
                    //     {
                    //         dataIndex: 'maxsize',
                            
                    //     },
                    //     {
                    //         dataIndex: 'multivalue',
                    //     },
                    //     {
                    //         dataIndex: 'transform',
                    //     },
                    // ]
        }

    }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

   onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
    componentWillMount() {
        API.get('treedata')
            .then((response) => {
                this.setState({ rows: response.data });
                console.log("check", this.state.rows);

            });
            API.get('options')
            .then((response) => {
                this.setState({ items: response.data });
                console.log("check", this.state.items);

            });
    }



    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Data
                    </div>
                </div>
                <Container fluid>
                    <Row>
                        <Col md ={4}>
                    <Tree
                        checkable
                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        treeData={this.state.treeData}
                    />
                    </Col>
                    <Col lg ={8}>
                    <Table columns={this.state.columns} dataSource={this.state.rows} bordered pagination={false}/>
                    </Col>
                    {/* <Col lg ={4}>
                    <Table columns={this.state.columns1} dataSource={this.state.items} bordered pagination={false}/>
                    </Col> */}
                    </Row>
                </Container>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(TreeData);