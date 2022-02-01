import React, { Component } from 'react';
import {FormControl, InputGroup, Button, Container, Card, Form } from 'react-bootstrap';



class userForm extends Component {

    data={
        ammontare:null,
        nota:null
    }

    dataHandler = (e) => {
        this.data[e.target.name]=e.target.value;
    }

    saveData = () => {
        if(this.props.view === "SPENDI")
            this.data.ammontare *= -1;

        this.props.addTransactions(this.data)
        .then(result => {
            this.props.setAlert({
                variant:"success",
                heading:"Aggiunta transazione",
                msg:"Transazione correttamente aggiunta",
                show:true
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        return( 

            <Container className="cardTransazione">
                <Card>
                    <Card.Title> {this.props.view} </Card.Title>
                    <Card.Body>
                        <Form>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>€</InputGroup.Text>
                                <FormControl name="ammontare" type="number" aria-label="Somma in euro" onChange={this.dataHandler}/>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>            

                            <InputGroup>
                                <InputGroup.Text>Nota</InputGroup.Text>
                                <FormControl as="textarea" aria-label="nota" name="nota" onChange={this.dataHandler}/>
                            </InputGroup>              
                        </Form>
                        <Button variant="success" onClick={this.saveData}>Salva</Button>
                        <Button variant="warning" onClick={() => this.props.setView("saldo")}>Cancella</Button>
                        <Button variant="primary" onClick={() => this.props.setView("saldo")}>Indietro</Button>
                    </Card.Body>
                    
                </Card>
            </Container>

          )
    
      }
}

export default userForm;