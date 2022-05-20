import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthPage from "../../../components/Generic/AuthPage";
import { THEME_COLOR, USER_STORAGE_KEY } from "../../../helpers/variables";
import useAuthentication from "../../../hooks/useAuthentication";

const SignIn = props => {
  const history = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const { register } = useAuthentication(history);

  const changeHandler = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitForm = async () => {
    const { name, username, password, email } = form;
    if (!email || !password || !name || !username)
      return alert("Please fill the form correctly!");
    const response = await register(form);
    if (response) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response));
      history("/home");
    }
  };

  return (
    <AuthPage title='Sign Up' onSubmit={submitForm} data={form}>
      <Grid container className='column-centered'>
        <Grid item xl={7} lg={7} md={7} sm={7} xs={8}>
          <TextField
            type='text'
            name='username'
            label='Username'
            id=''
            className='form__input'
            onChange={changeHandler}
            required
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
          />
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={7} xs={8}>
          <TextField
            type='email'
            name='email'
            label='Email'
            id=''
            className='form__input'
            onChange={changeHandler}
            required
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
          />
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={7} xs={8}>
          <TextField
            type='text'
            name='name'
            label='Name'
            id=''
            className='form__input'
            onChange={changeHandler}
            required
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
          />
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={7} xs={8}>
          <TextField
            type='password'
            name='password'
            label='Password'
            id=''
            className='form__input'
            onChange={changeHandler}
            required
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 16 } }}
          />
        </Grid>
        <Container>
          <Button
            className='u-margin-top-medium medium-theme-button'
            sx={{ background: THEME_COLOR, color: "white" }}
            onClick={submitForm}
          >
            Sign Up
          </Button>
        </Container>
      </Grid>
    </AuthPage>
  );
};

export default SignIn;
