import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress } from 'reactstrap';
import API from '../../services/BaseService';



class Portfolio extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rows: [],
          };
    

    }
    componentWillMount() {
        API.get('portfolio')
        .then((response) => {
          this.setState({rows:response.data});
          console.log("checking",this.state.rows);

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
                             <h4>Project Summary</h4>
                             <h6 style={{color:"red"}}>Portfolio</h6>
                            <div className="d-flex">
                            <p className="text-muted m-0">Scope: 
                                <span className="text-dark font-weight-bold">{rowsObject.scope}</span>
                            </p>
                            </div>
                            <div className="d-flex">
                            <p className="text-muted m-0">No of Database: 
                                <span className="text-dark font-weight-bold">{rowsObject.noOfDatabase}</span>
                            </p>
                            </div>
                            <div className="d-flex">
                            <p className="text-muted m-0">Volume Of Data: 
                                <span className="text-dark font-weight-bold">{rowsObject.volumeofData}</span>
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

export default withNamespaces('translations')(Portfolio);