import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';



class Header extends Component {
 
    state={
        me:{}
    }

    componentDidMount(){
        this.props.getMe()
        .then(data => this.setState({me:data}))
        .catch(error => console.log(error))
    }

    render(){
        return( 
            <Navbar bg={this.state.me.tipo ? "dark" : "light"} variant={this.state.me.tipo ? "dark" : "light"}>
                <Container>
                    <Navbar.Brand>{this.state.me.nome}</Navbar.Brand>
                </Container>
            </Navbar>
          )
    
      }
}

export default Header;