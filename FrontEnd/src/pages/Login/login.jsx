import React from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import "./login.css";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth.slice";

import Footer from "../../components/footer/footer";
const Login = () => {
  const { role } = useSelector((state) => state.auth);
  console.log("role", role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleButtonClick = () => {
    navigate("/register");
  };
  const handleButtonClickForgetPassword = () => {
    navigate("/forgotPassword");
  };
  const handleSuccess = useCallback(() => {
    if (role === "admin") {
      navigate("/dashboardAdmin");
    } else {
      navigate("/dashboardClient");
    }
  }, [role, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setSnackbarMessage("Veuillez remplir tous les champs");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await dispatch(
        login({ email: email, password: password })
      );
      if (response.error) {
        setSnackbarMessage("email et/ou mot de passe incorrect(s).");
        setSnackbarOpen(true);
      } else {
        handleSuccess();
      }
    } catch (error) {
      setSnackbarMessage("Une erreur s'est produite lors de la connexion.");
      // setSnackbarOpen(true);
    }
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
            Se connecter
          </Typography>
          <form className="login-form">
            <TextField
              label="Adresse e-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Mot de passe"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "#597e52", color: "white" }}
              fullWidth
              className="login-button"
              onClick={handleSubmit}
            >
              Se connecter
            </Button>
          </form>
          <Typography variant="body2" className="login-link">
            <Link
              href="#"
              color="inherit"
              onClick={handleButtonClickForgetPassword}
            >
              Mot de passe oublié ?
            </Link>
          </Typography>
          <Typography
            variant="body2"
            onClick={handleButtonClick}
            className="login-link"
          >
            Vous n'avez pas de compte ?{" "}
            <Link href="#" color="inherit">
              Créer un compte
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Login;
