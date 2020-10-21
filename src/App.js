import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ZoneContextProvider from './contexts/ZoneContext';
import Header from './components/Header';
import Home from './components/Home';
import DetalleZona from './components/DetalleZona';
import Entrega from './components/Entrega';
import Checkout from './components/Checkout';
import Desbloquear from './components/Desbloquear';
import PreBookingContextProvider from './contexts/PreBookingContext';
import LanguageContextProvider from './contexts/LanguageContext';
import { CSSTransition } from 'react-transition-group';



function App() {
  return (
    <Router>
    <div>

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
            
          </PreBookingContextProvider>
        </ZoneContextProvider>
        </LanguageContextProvider>
    </div>

    

    <footer>
      <p className="text-center">Todos los derechos reservados. Uno Smart Mobility OU®</p>
    </footer>
    
    </Router>
  );
}

export default App;
