import React, { Component } from 'react';
import {Row, Col, Button, Container } from 'react-bootstrap';



class userActionButton extends Component {


    render(){
        return( 

            <Container className="actionButtons">
                <div className="mb-2">
                    <Row>
                        <Col>
                            <Button variant="danger" size="lg" onClick={() => this.props.setView("SPENDI")}>SPENDI</Button>
                        </Col>
                        <Col>
                            <Button variant="success" size="lg" onClick={() => this.props.setView("SALVA")}>SALVA</Button>
                        </Col>
                    </Row>
                </div>
            </Container>

          )
    
      }
}

export default userActionButton;