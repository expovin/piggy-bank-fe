import React, { Component } from 'react';
import {Container, Card } from 'react-bootstrap';
import Moment from 'react-moment';


class transazioniUser extends Component {

    state={
        transazioni:null
    }
 
    componentDidMount(){
        console.log("==== transazioniUser ====");
        this.props.getTransactions()
        .then(data => this.setState({transazioni:data}))
        .catch(error => console.log(error))
    }

    transazioni = () => {
        return(
            this.state.transazioni.map( t => {
                return(
                    <Container key={t.id}>
                        <Card className={ t.id_approver === 0 ? "cardTransazione transazioneSospesa" : "cardTransazione transazioneConfermata"}>
                            <Card.Body>
                                <Card.Title className={t.ammontare > 0 ? "ammontare positivo" : "ammontare negativo"}>{t.ammontare} €</Card.Title>
                                <Card.Subtitle><Moment format="DD MMM YYYY">{t.data}</Moment></Card.Subtitle>
                                <Card.Text>{t.nota}</Card.Text>
                            </Card.Body>
                        </Card> 
                    </Container>
 
                )
            })
        )
    }

    render(){
        return( 
            this.state.transazioni ? this.transazioni() : "Loading ..."
          )
    
      }
}

export default transazioniUser;