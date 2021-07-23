import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import API from '../../services/BaseService';



class SingleView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rows: [],
          };
        this._columns = [
            {
                key: 'id',
                name: 'ID',
                width: 80
            },
            {
                key: 'title',
                name: 'Title',
                sortable: true
            },
            
            {
                key: 'author',
                name: 'Author',
                sortable: true
            },
            
           
        ];

    }
    componentWillMount() {
        API.get('posts')
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
                <div className="content-heading">
                    <div>Migration Progress
                    </div>
                </div>
                <Container fluid>
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.rows.length}
                        // minHeight={700} 
                        />
                </Container>
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(SingleView);