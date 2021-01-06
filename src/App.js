import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import ZoneContextProvider from './contexts/ZoneContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import DetalleZona from './components/DetalleZona';
import Entrega from './components/Entrega';
import Checkout from './components/Checkout';
import Desbloquear from './components/Desbloquear';
import CancelarReserva from './components/CancelarReserva';
import ConfirmacionCancelarReserva from './components/ConfirmacionCancelarReserva';
import Pagos from './components/Pagos';
import PreBookingContextProvider from './contexts/PreBookingContext';
import LanguageContextProvider from './contexts/LanguageContext';
import DetallePatinete from './components/DetallePatinete';
import { AnimatePresence } from 'framer-motion';
import DirectionContextProvider from './contexts/DirectionContext';
import Login from './components/Login';
import Signup from './components/Signup';
import LoginContextProvider from './contexts/LoginContext';
import BookingContextProvider from './contexts/BookingContext';
import SignUpContextProvider from './contexts/SignUpContext';



function App() {
  const location = useLocation();
  
  return (
        <LanguageContextProvider>

          <Header/>

          <LoginContextProvider>
            <ZoneContextProvider>
              <PreBookingContextProvider>
                <DirectionContextProvider>
                  <BookingContextProvider>
                    <SignUpContextProvider>
                    <AnimatePresence exitBeforeEnter>
                      <Switch location={location} key={location.key}>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/zona">
                            <DetalleZona />
                        </Route>
                        <Route path="/entrega">
                            <Entrega />
                        </Route>
                        <Route path="/detalle-patinete">
                            <DetallePatinete />
                        </Route>
                        <Route path="/checkout">
                            <Checkout />
                        </Route>
                        <Route path="/desbloquear">
                            <Desbloquear />
                        </Route>
                        <Route path="/pagos">
                            <Pagos />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/cancelar-reserva">
                            <CancelarReserva />
                        </Route>
                        <Route path="/cancelar-reserva-notificacion">
                            <ConfirmacionCancelarReserva />
                        </Route>
                        </Switch>
                    </AnimatePresence>
                    </SignUpContextProvider>
                  </BookingContextProvider>
                </DirectionContextProvider>
    
                <Footer />
    
              </PreBookingContextProvider>
            </ZoneContextProvider>
          </LoginContextProvider>
        </LanguageContextProvider>
  );
}

export default App;
