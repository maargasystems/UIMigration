import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import API from '../../services/BaseService';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import SingleView from '../SingleView/SingleView';
import Portfolio from '../Portfolio/Portfolio';
import Timeline from '../Timeline/Timeline';
import Contacts from '../Contacts/Contacts';
import ContactsAcme from '../ContactsAcme/ContactsAcme';
import '../../styles/app.scss';
import Setup from '../SetUp/Setup';
import Servers from '../Servers/Servers';




class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTab: 'home'
        };
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <ContentWrapper>

                <Row>
                    <Col>
                        { /* START panel tab */}
                        <div className="card card-transparent">
                            <Nav tabs justified>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'home' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('home'); }}
                                    >
                                        <em ></em>Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'project' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('project'); }}
                                    >
                                        <em ></em>Project
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'setup' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('setup'); }}
                                    >
                                        <em ></em>Setup
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'extract' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('extract'); }}
                                    >
                                        <em ></em>Extract
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'transform' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('transform'); }}
                                    >
                                        <em ></em>Transform
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'load' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('load'); }}
                                    >
                                        <em ></em>Load
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'validate' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('validate'); }}
                                    >
                                        <em ></em>Validate
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab} className="bg-white p-0">
                                <TabPane tabId="home">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Portfolio />
                                            <Timeline />
                                        </div>
                                        <div className="col-md-6">
                                            <Contacts />
                                            <ContactsAcme />
                                        </div>
                                    </div>

                                    <SingleView />
                                </TabPane>
                                <TabPane tabId="setup">
                                    <Setup />
                                    {/* <Servers/> */}

                                </TabPane>
                            </TabContent>
                        </div>
                        { /* END panel tab */}
                    </Col>

                </Row>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Home);