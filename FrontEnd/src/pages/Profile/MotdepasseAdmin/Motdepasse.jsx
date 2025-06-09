import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Alert,
  CardContent,
  CardHeader,
  Card,
  Divider,
  Grid,
  CardActions,
  Snackbar,
} from "@mui/material";
import ControlledTextField from "../../../components/ControlledTextField/ControlledTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosPrivate } from "../../../utils/axios";
import { MdpsValidation } from "../../../utils/validation";
const Motdepasse = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState();
  const { user } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
      password: "",
      newPassword: "",
    },
    resolver: yupResolver(MdpsValidation),
  });

  const updateAdminPass = async (formData) => {
    try {
      const response = await axiosPrivate.put(`admin/updateAdminPass/`, {
        email: user.email,
        password: formData.password,
        newPassword: formData.newPassword,
      });
      console.log(response);
      setSnackbarMessage("Votre mot de passe a été changé avec succès");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Mot de passe actuel incorrect");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={300}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(updateAdminPass)}
      >
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
          {errors && (
            <Alert severity="error" onClose={() => setError("")}>
              {errors.password?.message}
              {errors.newPassword?.message}
            </Alert>
          )}
        </div>
        <Card>
          <CardHeader
            subheader="Changer votre mot de passe"
            title="Mot de passe"
          />
          <CardContent sx={{ pt: 8 }}>
            <Box sx={{ m: 1.5, marginTop: "-35px" }}>
              <Grid container spacing={-5}>
                <Grid item xs={12} md={6}>
                  <label style={{ fontWeight: "bold" }}>
                    Mot de passe actuel
                  </label>{" "}
                  <ControlledTextField
                    name="password"
                    type="password"
                    placeholder="********"
                    control={control}
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.password}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <label style={{ fontWeight: "bold" }}>
                    Nouveau mot de passe
                  </label>{" "}
                  <ControlledTextField
                    type="password"
                    placeholder="********"
                    name="newPassword"
                    control={control}
                    error={Boolean(errors?.newPassword)}
                    helperText={errors?.newPassword?.message}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              Modifier mot de passe
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
export default Motdepasse;
