import React, { useContext, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext';
import { DirectionContext } from '../contexts/DirectionContext';
import { LoginContext } from '../contexts/LoginContext';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';


const Login = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { transl } = useContext(LanguageContext);
    const { user, setUser } = useContext(LoginContext);
    const [ userInfo, setUserInfo ] = useState({});
    const { isForward } = useContext(DirectionContext);

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        setUser({
            email: userInfo.email,
            password: userInfo.password
        })

        //Send info to endpoint
        // const sendUser = async () => {
        //     const response = await fetch('ENDPOINT', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ user })
        //     });
        //     const data = await response.json();

        //     return data;
        // }
        
        // sendUser()
        //   .then(data => {
        //     // Setting user data in react state
        //     setUser({ ...user, userData: data, isLoggedIn });
        //   })
        //   .catch(err => console.log(err));

        props.history.push('/checkout');
    }

    return (
        <motion.div 
            variants={containerVariant}
            initial={isForward ? 'hidden' : 'hiddenBack'}
            animate="visible"
            exit={isForward ? 'exit' : 'exitBack'}
            className="container"
        >

            <div className="wrapper">

                <div className="left">
                    <img src="../images/scooter.jpg" alt=""/>
                </div>

                <div className="panel right">
                    <h2 className="text-center">Iniciar Sesión</h2>

                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <input onChange={e => handleChange(e)} type="email" name="email" className="form-control" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <input onChange={e => handleChange(e)} type="password" name="password" className="form-control" placeholder="Contraseña" required />
                        </div>
                        <div className="form-group">
                            <button className="form-control link">
                                Iniciar Sesión
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </form>

                    <div className="sm_buttons">
                      <a href="" className="link fb">
                        <img src="images/fb.png" alt="" />
                        Inicia sesión con Facebook
                      </a>

                      <a href="" className="link google">
                        <img src="images/google.png" alt="" />
                        Inicia sesión con Google
                      </a>
                    </div>

                    <h2 className="text-center">¿No estás registrado?</h2>
                    <Link to="/signup" className="link secondary">Regístrate</Link>

                </div>

            </div>
        </motion.div>

    )
}

export default withRouter(Login);

