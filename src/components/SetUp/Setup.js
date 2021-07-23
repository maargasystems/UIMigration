import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import API from '../../services/BaseService';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Servers from '../Servers/Servers';
import Portfolio from '../Portfolio/Portfolio';
import Timeline from '../Timeline/Timeline';
import Contacts from '../Contacts/Contacts';
import ContactsAcme from '../ContactsAcme/ContactsAcme';
import '../../styles/app.scss'
import Databases from '../Databases/Databases';
import Groups from '../Groups/Groups';

class Setup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTab: 'servers'
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
                        <div style={{ fontSize: 20, margin: "auto", fontWeight: "bold" }}>Migration Setup - Source</div>

                        <div className="card card-transparent">
                            <Nav tabs justified>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'servers' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('servers'); }}
                                    >
                                        <em ></em>Servers
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'databases' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('databases'); }}
                                    >
                                        <em ></em>Databases
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'filters' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('filters'); }}
                                    >
                                        <em ></em>Filters
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'groups' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('groups'); }}
                                    >
                                        <em ></em>Groups
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab === 'users' ? 'active' : ''}
                                        onClick={() => { this.toggleTab('users'); }}
                                    >
                                        <em ></em>Users
                                    </NavLink>
                                </NavItem>


                            </Nav>
                            {/* <Servers /> */}
                            <TabContent activeTab={this.state.activeTab} className="bg-white p-0">
                                <TabPane tabId="servers">
                                <div style={{ fontSize: 20, margin: "auto", fontWeight: "bold" }}>Setup - Source Servers</div>
                                    <Servers />
                                </TabPane>
                                <TabPane tabId="databases">
                                <div style={{ fontSize: 20, margin: "auto", fontWeight: "bold" }}>Setup - Source Databases</div>

                                    <Databases />

                                </TabPane>
                                <TabPane tabId="groups">
                                <div style={{ fontSize: 20, margin: "auto", fontWeight: "bold" }}>Setup - Source Groups</div>

                                    <Groups />

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

export default withNamespaces('translations')(Setup);