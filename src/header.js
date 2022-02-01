import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';



class Header extends Component {
 
    render(){
        return( 
            <Navbar bg={this.props.me.tipo ? "dark" : "light"} variant={this.props.me.tipo ? "dark" : "light"}>
                <Container>
                    <Navbar.Brand>{this.props.me.nome}</Navbar.Brand>
                </Container>
            </Navbar>
          )
    
      }
}

export default Header;