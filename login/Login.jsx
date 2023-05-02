import React from 'react';
import img from '../../assets/logo-bq.png';
import FormLogin from './FormLogin';

const LoginView = () => (
  <section className="container-login">
    <div className="box-login">
      <img src={img} alt="logo" className="logo" />
      <FormLogin />
    </div>
  </section>
);

export default LoginView;