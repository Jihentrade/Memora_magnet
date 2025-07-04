import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import "./login.css";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth.slice";
import { toast } from "../../redux/toasts.slice";
import Footer from "../../components/footer/footer";

const Login = () => {
  const { role } = useSelector((state) => state.auth);
  console.log("role", role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleButtonClick = () => {
    navigate("/register");
  };

  const handleButtonClickForgetPassword = () => {
    navigate("/forgotPassword");
  };

  const handleSuccess = useCallback(() => {
    if (role === "admin") {
      navigate("/dashboardAdmin");
      console.log("admin")
    } else {
      navigate("/dashboardClient");
    }
  }, [role, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est requise";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide";
    }

    if (!password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    } else if (password.length < 3) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(
        login({ email: email.trim(), password: password })
      );

      if (response.error) {
        dispatch(
          toast({
            message: "Email et/ou mot de passe incorrect(s).",
            severity: "error",
          })
        );
      } else {
        dispatch(
          toast({
            message: "Connexion réussie !",
            severity: "success",
          })
        );
        handleSuccess();
      }
    } catch (error) {
      dispatch(
        toast({
          message: "Une erreur s'est produite lors de la connexion.",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
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
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              label="Adresse e-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />
            <TextField
              label="Mot de passe"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "#597e52", color: "white" }}
              fullWidth
              className="login-button"
              type="submit"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          <Typography variant="body2" className="login-link">
            <Link
              href="#"
              color="inherit"
              onClick={handleButtonClickForgetPassword}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              Mot de passe oublié ?
            </Link>
          </Typography>
          <Typography
            variant="body2"
            onClick={handleButtonClick}
            className="login-link"
            style={{ pointerEvents: loading ? "none" : "auto" }}
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
