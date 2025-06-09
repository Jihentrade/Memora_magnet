import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  Button,
  Grid,
  Alert,
  Box,
} from "@mui/material";
import ControlledTextField from "../../../components/ControlledTextField/ControlledTextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../../../utils/axios";
import { validationUpdateAdmin } from "../../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { setAdmin } from "../../../redux/auth.slice";

const InformationProfile = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      name: user.name || "",
      lastname: user.lastname || "",
      phone: user.phone || "",
      email: user.email || "",
      password: user.password || "",
      role: user.role || "",
    },
    resolver: yupResolver(validationUpdateAdmin),
  });

  const handleUpdateAdmin = async (formState) => {
    try {
      const { data } = await axiosPrivate.put(
        `admin/updateAdmin/${user._id}`,
        formState
      );

      if (data) {
        dispatch(setAdmin(data));
        setSnackbarMessage("Votre profil a été mis à jour avec succès.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(
        "Une erreur s'est produite lors de la mise à jour de votre profil."
      );
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
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("succès") ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleUpdateAdmin)}
      >
        <Card>
          <CardHeader subheader="Informations personnelles" title="Profile" />
          <CardContent sx={{ pt: 8 }}>
            <Box sx={{ m: 1.5, marginTop: "-50px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    name="name"
                    control={control}
                    autoComplete="family-name"
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    name="lastname"
                    control={control}
                    error={Boolean(errors?.lastname)}
                    helperText={errors?.lastname?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    name="email"
                    control={control}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    name="phone"
                    control={control}
                    error={Boolean(errors?.phone)}
                    helperText={errors?.phone?.message}
                  />
                </Grid>
                /
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="role"
                    label=""
                    name="role"
                    autoComplete="role"
                    value={user.role}
                    disabled={true}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              disabled={!isDirty}
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<ModeEditOutlineOutlinedIcon />}
            >
              Mettre à jour mon profil
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default InformationProfile;
