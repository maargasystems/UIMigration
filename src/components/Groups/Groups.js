import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress,CardFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';



class Groups extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rows: [],
          };
        this._columns = [
            {
                name: 'Select',
                render: (text, dataSource) => <input type="checkbox" ></input>
            },
            {
                key: 'groupName',
                name: 'Group Name',

            },
            
            {
                key: 'groupdescription',
                name: 'Group Description',
                width:200
               
            },
            {
                key: 'dbCount',
                name: 'DB Count',
                sortable: true
            },
            {
                key: 'totalSize',
                name: 'Total Size',
            },
            {
                key: 'comments',
                name: 'Comments',
                width:200
            },
            {
                name: 'Actions',
            },
            
        ];

    }
    componentWillMount() {
        API.get('groups')
        .then((response) => {
          this.setState({rows:response.data});
          console.log("check",this.state.rows);

        });
      }

    rowGetter = (i) => this.state.rows[i]

    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };

        const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
    };
    

    render() {
        return (
            <ContentWrapper>
               
                <Container fluid>
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.rows.length}
                        // minHeight={700} 
                        />
                </Container>
                <CardFooter className="text-center">
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Add Group</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Edit Selected</button>
                                    <button type="submit" className="btn btn-info" style={{marginRight:10}}>Delete Selected</button>

                                </CardFooter>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Groups);