import React, { useState } from 'react';
import { Card, InputGroup, Text, H2, Button, Spinner } from "@blueprintjs/core";
import firebase from 'firebase';
import './styles.scss';

const signIn = (setIsLoading, props, user, password) => {
  setIsLoading(true)
  firebase.auth()
  .signInWithEmailAndPassword(user, password)
    .then(response => {
      setIsLoading(false);
      props.onSignIn && props.onSignIn(response.user);
    })
    .catch(function(error) {
      // Handle Errors here.
      alert(error.code);
      alert(error.message);
      setIsLoading(false);
      // ...
    });
}
const SignIn = (props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? 
    <Spinner /> : 
    <Card className="sign-in-card">
      <H2>Bienvenido!</H2>
      <Text>Ingresa tus datos para poder inisiar sesión</Text>
      <InputGroup 
        className="user-input" 
        placeholder="Usuario" 
        onChange={(e) => setUser(e.target.value)} />
      <InputGroup 
        className="password-input" 
        placeholder="Contraseña" 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}/>
      <Button 
        className="bp3-minimal" 
        text="Iniciar sesión" 
        intent="primary" 
        onClick={() => signIn(setIsLoading, props, user, password)}/>
    </Card>
}

export default SignIn;