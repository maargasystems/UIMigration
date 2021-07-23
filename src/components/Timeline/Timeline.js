import React, { Component } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Progress } from 'reactstrap';
import API from '../../services/BaseService';



class Timeline extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rows: [],
          };
    

    }
    componentWillMount() {
        API.get('timeline')
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
                             <h6 style={{color:"red"}}>TimeLine</h6>
                            <div className="d-flex">
                            <p className="text-muted m-0">StartDate: 
                                <span className="text-dark font-weight-bold">{rowsObject.startdate}</span>
                            </p>
                            </div>
                            <div className="d-flex">
                            <p className="text-muted m-0">TargetCompletionDate: 
                                <span className="text-dark font-weight-bold">{rowsObject.targetcompletiondate}</span>
                            </p>
                            </div>
                            <div className="d-flex">
                            <p className="text-muted m-0">CompletedTillDate: 
                                <span className="text-dark font-weight-bold">{rowsObject.completedtilldate}</span>
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

export default withNamespaces('translations')(Timeline);