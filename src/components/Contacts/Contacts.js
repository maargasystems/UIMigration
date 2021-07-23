import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress } from 'reactstrap';
import API from '../../services/BaseService';



class Contacts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rows: [],
          };
    

    }
    componentWillMount() {
        API.get('contacts')
        .then((response) => {
          this.setState({rows:response.data});
          console.log("checking11",this.state.rows);

        });
      }


    
    

    render() {
        return (
            <ContentWrapper>
                 {this.state.rows && this.state.rows.length > 0 &&
                 <>
                 {
                      this.state.rows.map((rowsObject, index) => {
                          return(
                             <>
                             <h4>Key Project Info</h4>
                             <h6 style={{color:"red"}}>Contacts-Maarga</h6>
                            <div className="d-flex">
                            <p className="text-muted m-0">ProjectManager: 
                                <span className="text-dark font-weight-bold">{rowsObject.projectmanager}</span>
                            </p>
                            </div>
                            <div className="d-flex">
                            <p className="text-muted m-0">MigrationSME: 
                                <span className="text-dark font-weight-bold">{rowsObject.migrationSme}</span>
                            </p>
                            </div>
                            <div className="d-flex">
                            <p className="text-muted m-0">SubjectMatterExpert: 
                                <span className="text-dark font-weight-bold">{rowsObject.subjectmatterExpert}</span>
                            </p>
                            </div>
                            </> 

                          )
                      })
                    }
                    </>
    }
                
            </ContentWrapper>
        )
    }
}

export default withNamespaces('translations')(Contacts);