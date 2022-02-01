import React, {Component} from 'react';
import queryString from 'query-string';
import Login from './login';
import Header from './header';
import SaldoUser from './saldoUser';
import TransazioniUser from './transazioniUser';
import UserActionButton from './userActionButtons';
import UserForm from './userForm';
import AlertBanner from './alert';
import axios from 'axios';

import './App.css';


axios.interceptors.request.use( request =>{
  /** 
   * Qui è possibile editare qualsiasi request in uscita
   * ad esempio aggiungere headers variable 
   * */ 
  let token = localStorage.getItem('token');
  if(token)
    request.headers['x-access-token'] =  token;

   return (request)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in spedizione di requests
   */

   console.log("Errore nella spedizione della request. E' possibile gestirla globalmente da index.js")
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})

axios.interceptors.response.use( response =>{
  /**
   * Qui è possibile editare qualsiasi response in entrata
   * */ 

  let params = queryString.parse(window.location.search)
  if(params.token && !localStorage.getItem('token')){
    console.log("[IMPOSTO IL TOKEN IN LOCALSTORAGE]")
    localStorage.setItem('token', params.token);
  }   

   return (response)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in ricezione di response
   */
  console.log(error.message) 
   if(error.toString().indexOf("status code 401") !== -1  || error.toString().indexOf("status code 403") !==-1 ){
    console.log("Rimuovo il token!")
    localStorage.removeItem('token');
   }

   if(error.message === 'Network Error'){
      localStorage.setItem('offline',true);
      console.log("Trovato Network error centrale, vado in OFFLINE : ")
      window.location = '/offline'
      
   }
        

   
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})


class App extends Component {

  state = {
    isLogged:false,
    me:{},
    msgError : {
      variant:null,
      heading:null,
      msg:null,
      show:false
    },
    view:"saldo"
  }

  closeAlert = () => {
    let msgNull = {
      variant:null,
      heading:null,
      msg:null,
      show:false      
    }
    this.setState({msgError:msgNull});
  }

  setAlert = (alert) => {this.setState({msgError:alert})}

  setView = (view) => {this.setState({view:view})}

  getMe = () => {
    return new Promise ((fulfill, reject) => {
      axios.get('/api/me')
      .then( result => fulfill(result.data.data[0]))
      .catch(error => {
        let msgError = {
          variant:"warning",
          heading:"Errore recupero dati personali",
          msg:error,
          show:true
        }
        this.setState({showError:true, msgError:msgError});
        reject(error);
      })
    })
  }   

  getAmount = () => {
    return new Promise ((fulfill, reject) => {
      axios.get('/api/amount')
      .then( result => fulfill(result.data.data[0]))
      .catch(error => {
        let msgError = {
          variant:"warning",
          heading:"Errore recupero amount",
          msg:error,
          show:true
        }
        this.setState({showError:true, msgError:msgError});
        reject(error);
      })
    })
  }  

  getTransactions = () => {
    return new Promise ((fulfill, reject) => {
      axios.get('/api/transactions')
      .then( result => fulfill(result.data.data))
      .catch(error => {
        let msgError = {
          variant:"warning",
          heading:"Errore recupero transactions",
          msg:error,
          show:true
        }
        this.setState({showError:true, msgError:msgError});
        reject(error);
      })
    })
  }    

  addTransactions = (data) => {
    data['userId']=this.state.me.id;
    console.log(data);
    return new Promise ((fulfill, reject) => {
      axios.post('/api/transactions',data)
      .then( result => fulfill(result.data.data))
      .catch(error => {
        let msgError = {
          variant:"warning",
          heading:"Errore aggiunta transactions",
          msg:error,
          show:true
        }
        this.setState({showError:true, msgError:msgError});
        reject(error);
      })
    })
  }    

  componentDidMount() {

    let params = queryString.parse(window.location.search);

    if(params.token)
      localStorage.setItem('token',params.token)

    if(localStorage.getItem('token')){
      this.setState({isLogged:true})

    }
      
    else
      this.setState({isLogged:false})

  }

  showCurrentPage () {

    switch(this.state.view) {
      case 'saldo' :
        return (
          <div>
            <Header getMe={this.getMe}/>
            <AlertBanner  alert={this.state.msgError}
                          closeAlert={this.closeAlert} />             
            <SaldoUser getAmount={this.getAmount} />
            <TransazioniUser getTransactions={this.getTransactions} />
            <UserActionButton setView={this.setView}/>
          </div>          
        )

      case 'SPENDI':
      case 'SALVA':
        return(
          <div>
            <Header getMe={this.getMe}/>
            <AlertBanner  alert={this.state.msgError}
                          closeAlert={this.closeAlert} />             
            <UserForm view={this.state.view} 
                      addTransactions={this.addTransactions}
                      setView={this.setView}
                      setAlert={this.setAlert}/>
          </div>          
        )

      default : return (null);
    }
  }

  render(){
    if(!this.state.isLogged) return (<Login />)
    else {     
      if(this.state.view === "saldo") {
        return(
          <div>
            <Header getMe={this.getMe}/>
            <AlertBanner  alert={this.state.msgError}
                          closeAlert={this.closeAlert} />             
            <SaldoUser getAmount={this.getAmount} />
            <TransazioniUser getTransactions={this.getTransactions} />
            <UserActionButton setView={this.setView}/>
          </div>
        )        
      } else {
        return(
          <div>
            <Header getMe={this.getMe}/>
            <AlertBanner  alert={this.state.msgError}
                          closeAlert={this.closeAlert} />             
            <UserForm view={this.state.view} 
                      addTransactions={this.addTransactions}
                      setView={this.setView}
                      setAlert={this.setAlert}/>
          </div>
          
        )
      }
      
    }

  }
}

export default App;
