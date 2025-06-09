import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AjoutClientValidation } from "../../utils/validation";
import Navbar from "../Navbar/navbar";
import "./signup.css";
import Footer from "../footer/footer";
const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prenom: "",
      name: "",
      numero: "",
      email: "",
      password: "",
      adresse: "",
    },
    resolver: yupResolver(AjoutClientValidation),
  });

  const onSubmit = (data) => {
    // Logique de soumission du formulaire ici
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="login-container"
      >
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3} className="login-box">
          <Typography variant="h5" className="login-title">
            Créer un compte
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  control={control} 
                  margin="normal"
                />
                {errors.name && (
                  <Typography color="error">{errors.name.message}</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  name="prenom"
                  control={control} 
                  margin="normal"
                />
                {errors.prenom && (
                  <Typography color="error">{errors.prenom.message}</Typography>
                )}
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Adresse e-mail"
              name="email"
              type="email"
              control={control} 
              margin="normal"
            />
            {errors.email && (
              <Typography color="error">{errors.email.message}</Typography>
            )}
            <TextField
              fullWidth
              label="Adresse"
              name="adresse"
              type="text"
              control={control} 
              margin="normal"
            />
            {errors.adresse && (
              <Typography color="error">{errors.adresse.message}</Typography>
            )}
            <TextField
              fullWidth
              label="Numéro"
              name="numero"
              type="text"
              control={control} 
              margin="normal"
            />
            {errors.numero && (
              <Typography color="error">{errors.numero.message}</Typography>
            )}
            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              control={control} 
              margin="normal"
            />
            {errors.password && (
              <Typography color="error">{errors.password.message}</Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Créer un compte
            </Button>
          </form>
          <Typography style={{ marginTop: 20 }} className="login-link">
            Déjà un compte ? <Link to="/login">Connectez-vous ici</Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: "10%" }}>
        <Footer />
      </Grid>
    </div>
  );
};

export default Signup;
