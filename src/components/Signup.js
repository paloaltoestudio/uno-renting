import React, { useContext, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext';
import { DirectionContext } from '../contexts/DirectionContext';
import { SignUpContext } from '../contexts/SignUpContext';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es'


const Signup = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { transl } = useContext(LanguageContext);
    const [ userInfo, setUserInfo ] = useState({});
    const { isForward } = useContext(DirectionContext);
    const { signup, setSignup } = useContext(SignUpContext);
    const [ code, setCode ] = useState('');

    console.log(signup)

    const handleCode = e => {
        setCode(e);

        setSignup({
            ...signup,
            telefono: e
        });
    }
    const handleChange = e => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        setSignup({
            ...signup
        });

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
                    <h2 className="text-center">{transl('Regístrate')}</h2>

                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <input onChange={e => handleChange(e)} type="text" name="name" className="form-control" placeholder="Nombre" required />
                        </div>
                        <div className="form-group">
                            <input onChange={e => handleChange(e)} type="email" name="email" className="form-control" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <PhoneInput
                                labels={es}
                                international
                                defaultCountry="ES"
                                placeholder="Móvil"
                                value={code}
                                onChange={(e) => handleCode(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input onChange={e => handleChange(e)} type="password" name="password" className="form-control" placeholder="Contraseña" required />
                        </div>
                        <div className="form-group">
                            <button className="form-control link">
                                {transl('Regístrate')}
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

                    <h2 className="text-center">¿Ya estás registrado?</h2>
                    <Link to="/login" className="link secondary">Ingresa</Link>

                </div>

            </div>
        </motion.div>

    )
}

export default withRouter(Signup);

