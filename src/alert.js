import React, { Component } from 'react';
import {Alert, Container} from 'react-bootstrap';



class AlertBanner extends Component {

    componentDidMount() {
        console.log(this.props.alert)
    }

    render(){

        if(this.props.alert.show)
        return( 
            <Container>
                <Alert variant={this.props.alert.variant} onClose={() => this.props.closeAlert()} dismissible>
                    <Alert.Heading>{this.props.alert.heading}</Alert.Heading>
                    <p>{this.props.alert.msg}</p>
                </Alert>   
            </Container>
          )
          else
            return(null)
    
      }
}

export default AlertBanner;