import React, { Component } from 'react';
import {Row, Col, Container, Card, Badge } from 'react-bootstrap';



class governedSaldo extends Component {

    state={
        users:null
    }
 
    componentDidMount(){
        console.log("==== governedSaldo ====");
        this.props.getGoverned()
        .then(data => {
            this.setState({users:data})
            return this.props.getTransazioniToApprove()
        })
        .then(transToApprove => {
            let users=[];
            this.state.users.forEach( u => {
                u['toApprove'] = transToApprove.filter( tr => tr.id_user === u.id_child);
                users.push(u);
            })
            this.setState({users:users})
        })
        .catch(error => console.log(error))
    }


    governedUsers = () => {
        let toApprove=null;
        if(this.state.users)
        return(
            this.state.users.map( (u,idx) => {
                if(typeof(u.toApprove) === "object")
                    toApprove = u.toApprove.length;
                    //console.log(u.toApprove.length)
                return(
                    <Container key={u.idx}>
                        <Card className="cardSaldo">
                            <Card.Body>
                                <Card.Header>{u.nome} € <Badge bg="primary">{toApprove}</Badge></Card.Header>
                                <Card.Title className='ammontare saldo positivo'>{u.saldo} €</Card.Title>
                               
                            </Card.Body>
                        </Card> 
                    </Container>     
                )
            })
        )
        else
            return(null);
    }
    render(){
        return( 
            <div>
                {this.governedUsers()}
            </div>
            
          )
    
      }
}

export default governedSaldo;