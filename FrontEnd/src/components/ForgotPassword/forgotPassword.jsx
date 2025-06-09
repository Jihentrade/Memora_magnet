import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Navbar from "../Navbar/navbar";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../footer";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer l'e-mail de réinitialisation de mot de passe
    console.log("E-mail envoyé pour réinitialisation : ", email);
    // Réinitialisation du champ d'e-mail après l'envoi
    setEmail("");
  };

  return (
    <div>
      <Navbar />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "75vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Mot de passe oublié ?
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Adresse e-mail"
              type="email"
              value={email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Envoyer
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              color="primary"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Annuler
            </Button>
          </form>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
