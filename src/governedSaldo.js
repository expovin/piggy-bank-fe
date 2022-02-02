import React, { Component } from 'react';
import {Row, Button, Container, Card, Badge } from 'react-bootstrap';
import Moment from 'react-moment';


class governedSaldo extends Component {

    state={
        users:null
    }
 
    componentDidMount(){
        let users=[], usersResult=[]
        console.log("==== governedSaldo ====");
        this.props.getGoverned()
        .then(data => {
            //this.setState({users:data})
            users=data;
            return this.props.getTransazioniToApprove()
        })
        .then(transToApprove => {
            
            users.forEach( u => {
                u['toApprove'] = transToApprove.filter( tr => tr.id_user === u.id_child);
                u['show']=false;
                usersResult.push(u);
            })
            this.setState({users:usersResult})
        })
        .catch(error => console.log(error))
    }

    TransazioniDaApprovare = (user_id) => {
        let users = this.state.users.filter( u => u.id_child === user_id);
        if(typeof(users[0].toApprove) === "object"){
            return(
                users[0].toApprove.map( (tr,idx) => {
                    return(
                        <Card key={idx} className="cardSaldo">
                            <Card.Title className={tr.ammontare > 0 ? "ammontare positivo" : "ammontare negativo"}>{tr.ammontare} €</Card.Title>
                            <Card.Subtitle><Moment format="DD MMM YYYY">{tr.data}</Moment></Card.Subtitle>
                            <Card.Text>{tr.nota}</Card.Text>
                            <Card.Footer>
                                <Button variant="primary" onClick={() => this.props.setTransazioniToApprove(tr.id)}>Approva</Button>
                                <Button variant="danger" onClick={() => this.props.deleteTransazioneToApprove(tr.id)}>Rigetta</Button>
                            </Card.Footer>
                        </Card>
                    )

                })
            )

        } 
    }

    showTransactions = (id) => {
        let users = this.state.users;
        let index;

        let user = users.filter ( (u,idx) => {
            if(u.id_child === id) index=idx;
            return(u.id_child === id)
        });
        user[0].show=!user[0].show;
        users[index]=user[0];
        this.setState({users:users})
    }


    governedUsers = () => {
        let toApprove=null;
        if(this.state.users)
        return(
            this.state.users.map( (u,idx) => {
                if(typeof(u.toApprove) === "object")
                    toApprove = u.toApprove.length;
                return(
                    <Container key={u.idx}>
                        <Card className="cardSaldo">
                            <Card.Body>
                                <Card.Header>{u.nome} € <Badge bg="primary" onClick={() => this.showTransactions(u.id_child)}>{toApprove}</Badge></Card.Header>
                                <Card.Title className='ammontare saldo positivo'>{u.saldo} €</Card.Title>
                                {u.show ? 
                                        <Card.Body>
                                            {this.TransazioniDaApprovare(u.id_child)}
                                        </Card.Body> : null
                                }

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