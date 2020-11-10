import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ZoneContextProvider from './contexts/ZoneContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import DetalleZona from './components/DetalleZona';
import Entrega from './components/Entrega';
import Checkout from './components/Checkout';
import Desbloquear from './components/Desbloquear';
import PreBookingContextProvider from './contexts/PreBookingContext';
import LanguageContextProvider from './contexts/LanguageContext';
import { CSSTransition } from 'react-transition-group';
import DetallePatinete from './components/DetallePatinete';



function App() {
  return (
    <Router>
      <LanguageContextProvider>

        <Header/>
      

        <ZoneContextProvider>
          <PreBookingContextProvider>
              <Route exact path="/">
              <CSSTransition 
                    in={true} 
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                >
                  <Home />
                </CSSTransition>
              </Route>
              
              <Route path="/zona">
                <CSSTransition 
                    in={true} 
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                >
                  <DetalleZona />
                </CSSTransition>
              </Route>
              <Route path="/entrega">
                <CSSTransition 
                    in={true} 
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                >
                  <Entrega />
                </CSSTransition>
              </Route>
              <Route path="/detalle-patinete">
                <CSSTransition 
                    in={true} 
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                >
                  <DetallePatinete />
                </CSSTransition>
              </Route>
              <Route path="/checkout">
                <CSSTransition 
                    in={true} 
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                >
                  <Checkout />
                </CSSTransition>
              </Route>
              <Route path="/desbloquear">
                <CSSTransition 
                    in={true} 
                    appear={true}
                    timeout={1000}
                    classNames="transition"
                >
                  <Desbloquear />
                </CSSTransition>
              </Route>

              <Footer />
            
          </PreBookingContextProvider>
        </ZoneContextProvider>
        </LanguageContextProvider>
    
    

    </Router>
  );
}

export default App;
