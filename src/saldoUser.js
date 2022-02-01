import React, { Component } from 'react';
import {Row, Col, Container, Card, Form } from 'react-bootstrap';



class saldoUser extends Component {

    state={
        amount:null
    }
 
    componentDidMount(){
        console.log("==== saldoUser ====");
        this.props.getAmount()
        .then(data => this.setState({amount:data}))
        .catch(error => console.log(error))
    }


    saldo = (saldo) => {
        return(
            <Container>
            <Card className="cardSaldo">
                <Card.Body>
                    <Card.Title >SALDO</Card.Title>
                    <Card.Text className={saldo > 0 ? "saldo positivo" : "saldo negativo"}>{saldo} €</Card.Text>
                </Card.Body>
            </Card> 
        </Container>            
        )
    }
    render(){
        return( 


            <h2>{this.state.amount ? this.saldo(this.state.amount.saldo) : "Loading" }</h2>     
          )
    
      }
}

export default saldoUser;