import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const PanierPage = () => {
  // Données fictives pour l'exemple
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    numero: "",
    adresse: "",
  });
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const price = 12.49;
  const shipping = 5.99;
  const total = (price * quantity + shipping).toFixed(2);

  // Simule les images du panier (à remplacer par les vraies images du client)
  const images = Array.from(
    { length: 9 },
    (_, i) => `/images/magnet${i + 1}.jpg`
  );

  // Validation simple des champs
  const validateFields = () => {
    const newErrors = {};
    if (!clientInfo.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!clientInfo.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!clientInfo.numero.trim()) newErrors.numero = "Le numéro est requis";
    if (!clientInfo.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClientInfoChange = (e) => {
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };

  const handleValidate = async () => {
    if (!validateFields()) {
      return;
    }
    setLoading(true);
    try {
      // Simule l'envoi au backend
      const res = await fetch("/createCommande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images,
          quantity,
          price,
          shipping,
          total,
          promo: promoApplied ? promo : null,
          client: clientInfo,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setOpenModal(false);
        // Rediriger ou afficher un message de succès ici
      }
    } catch (e) {
      // Gérer l'erreur
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            bgcolor: "#f7f5f2",
            minHeight: "100vh",
            py: { xs: 1, sm: 3, md: 6 },
            px: { xs: 0.5, sm: 2, md: 4 },
          }}
        >
          <section>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 1, sm: 2, md: 4 },
                gap: { xs: 0.5, sm: 1, md: 2 },
                px: { xs: 0.5, sm: 1 },
              }}
            >
              <ShoppingCartIcon
                sx={{
                  color: "#176B87",
                  fontSize: { xs: 20, sm: 28, md: 38 },
                }}
              />
              <Typography
                component="h1"
                sx={{
                  fontWeight: "bold",
                  color: "#176B87",
                  letterSpacing: 1,
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "2rem" },
                }}
              >
                Votre panier
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, sm: 2, md: 4 },
                alignItems: "flex-start",
                justifyContent: "center",
                maxWidth: 1200,
                mx: "auto",
                px: { xs: 0.5, sm: 1 },
              }}
            >
              {/* Tableau panier */}
              <Paper
                elevation={2}
                sx={{
                  flex: 2,
                  width: "100%",
                  minWidth: { xs: "100%", md: 600 },
                  borderRadius: { xs: 1, sm: 2, md: 4 },
                  overflow: "hidden",
                }}
              >
                <TableContainer sx={{ overflowX: "auto" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ background: "#f5f5f5" }}>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            minWidth: { xs: 120, sm: 200, md: 300 },
                            py: 1,
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Description
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            minWidth: { xs: 60, sm: 80, md: 100 },
                            py: 1,
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Prix
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            minWidth: { xs: 100, sm: 120, md: 150 },
                            py: 1,
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Quantité
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            minWidth: { xs: 60, sm: 80, md: 100 },
                            py: 1,
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ py: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 0.5, sm: 1 },
                              flexDirection: { xs: "column", sm: "row" },
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: 40, sm: 50, md: 70 },
                                height: { xs: 40, sm: 50, md: 70 },
                                borderRadius: 1,
                                bgcolor: "#fff3e0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: { xs: 0.5, sm: 0 },
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(3, 1fr)",
                                  gridTemplateRows: "repeat(3, 1fr)",
                                  width: "100%",
                                  height: "100%",
                                  gap: 0.5,
                                }}
                              >
                                {images.map((img, i) => (
                                  <Box
                                    key={i}
                                    component="img"
                                    src={img}
                                    alt={`Magnet ${i + 1}`}
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: 0.5,
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  color: "#222",
                                  fontSize: {
                                    xs: "0.7rem",
                                    sm: "0.8rem",
                                    md: "1rem",
                                  },
                                }}
                              >
                                Magnets photo personnalisés 5 x 5 cm - Paquet de
                                9
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#666",
                                  fontSize: {
                                    xs: "0.6rem",
                                    sm: "0.7rem",
                                    md: "0.875rem",
                                  },
                                }}
                              >
                                Magnets photo personnalisés 5 x 5 cm - Paquet de
                                9
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#888",
                                  mt: 0.5,
                                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                                }}
                              >
                                04 juin, 15:38
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 500,
                            color: "#176B87",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                            py: 1,
                          }}
                        >
                          {price.toFixed(2)} €
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            <TextField
                              type="number"
                              size="small"
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Math.max(1, Number(e.target.value)))
                              }
                              inputProps={{
                                min: 1,
                                style: {
                                  textAlign: "center",
                                  width: { xs: 25, sm: 35, md: 45 },
                                  fontSize: {
                                    xs: "0.7rem",
                                    sm: "0.8rem",
                                    md: "1rem",
                                  },
                                },
                              }}
                              sx={{
                                width: { xs: 40, sm: 50, md: 60 },
                                "& input": { fontWeight: "bold" },
                              }}
                            />
                            <Button
                              color="error"
                              size="small"
                              sx={{
                                minWidth: 0,
                                p: 0.5,
                              }}
                            >
                              <RemoveShoppingCartIcon
                                sx={{
                                  fontSize: { xs: 16, sm: 18, md: 20 },
                                }}
                              />
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 500,
                            color: "#176B87",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                            py: 1,
                          }}
                        >
                          {(price * quantity).toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Section code promo */}
                <Box
                  sx={{
                    bgcolor: "#f5f5f5",
                    p: { xs: 1, sm: 1.5, md: 2 },
                    borderBottomLeftRadius: { xs: 1, sm: 2, md: 4 },
                    borderBottomRightRadius: { xs: 1, sm: 2, md: 4 },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      mb: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                    }}
                  >
                    Insérez votre code de réduction :
                  </Typography>
                  <Typography
                    sx={{
                      color: "#666",
                      mb: 1,
                      fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.875rem" },
                    }}
                  >
                    Les codes promotionnels, les bons d'achat et les e-cartes
                    cadeaux ne sont pas cumulables.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                    <TextField
                      placeholder="Code de réduction"
                      size="small"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      sx={{
                        flex: 1,
                        bgcolor: "#fff",
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              size="small"
                              disabled={!promo || promoApplied}
                              sx={{
                                backgroundColor: "#bdbdbd",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: 1,
                                boxShadow: "none",
                                textTransform: "none",
                                fontSize: {
                                  xs: "0.6rem",
                                  sm: "0.7rem",
                                  md: "0.875rem",
                                },
                                px: { xs: 0.5, sm: 1 },
                                "&:hover": { backgroundColor: "#176B87" },
                              }}
                              onClick={() => setPromoApplied(true)}
                            >
                              Appliquer
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
              {/* Résumé panier à droite */}
              <Paper
                elevation={2}
                sx={{
                  flex: 1,
                  width: "100%",
                  minWidth: { xs: "100%", md: 280 },
                  maxWidth: { xs: "100%", md: 340 },
                  borderRadius: { xs: 1, sm: 2, md: 4 },
                  p: { xs: 1, sm: 1.5, md: 2 },
                  bgcolor: "#f5f5f5",
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 0.5, sm: 1, md: 1.5 },
                  alignSelf: { xs: "stretch", md: "flex-start" },
                  mt: { xs: 0.5, md: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    color: "#222",
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                  }}
                >
                  <Typography>Sous-total</Typography>
                  <Typography>{(price * quantity).toFixed(2)} €</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#222",
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                  }}
                >
                  <Typography>Livraison</Typography>
                  <Box>
                    <Typography component="span">
                      {shipping.toFixed(2)} €
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#176B87",
                        fontSize: { xs: 8, sm: 9, md: 10 },
                        ml: 0.5,
                      }}
                    >
                      Livraison 11 juin
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    color: "#176B87",
                    fontSize: { xs: 12, sm: 14, md: 16 },
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography>{total} €</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    mt: { xs: 1, sm: 1.5, md: 2 },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      borderColor: "#176B87",
                      color: "#176B87",
                      fontWeight: "bold",
                      borderRadius: 1,
                      textTransform: "none",
                      py: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                    }}
                  >
                    Continuer mes achats
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      flex: 1,
                      backgroundColor: "#176B87",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: 1,
                      textTransform: "none",
                      py: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                      "&:hover": { backgroundColor: "#145C73" },
                    }}
                    onClick={handleOpenModal}
                    disabled={loading}
                  >
                    {loading ? "Validation..." : "Valider mon panier"}
                  </Button>
                </Box>
                {success && (
                  <Typography
                    sx={{
                      color: "green",
                      mt: 0.5,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                    }}
                  >
                    Commande validée avec succès !
                  </Typography>
                )}
              </Paper>
            </Box>
          </section>
        </Box>
      </main>
      <Footer />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 1, sm: 2, md: 4 },
            m: { xs: 0.5, sm: 1, md: 2 },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#176B87",
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            px: { xs: 1, sm: 1.5, md: 2 },
            py: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          Informations client
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0.5, sm: 1, md: 1.5 },
            mt: 0.5,
            px: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          <FormControl error={!!errors.nom} fullWidth size="small">
            <InputLabel
              htmlFor="nom"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
              }}
            >
              Nom
            </InputLabel>
            <OutlinedInput
              id="nom"
              name="nom"
              label="Nom"
              value={clientInfo.nom}
              onChange={handleClientInfoChange}
              autoComplete="family-name"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" } }}
            />
            {errors.nom && (
              <FormHelperText
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.875rem" },
                }}
              >
                {errors.nom}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.prenom} fullWidth size="small">
            <InputLabel
              htmlFor="prenom"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
              }}
            >
              Prénom
            </InputLabel>
            <OutlinedInput
              id="prenom"
              name="prenom"
              label="Prénom"
              value={clientInfo.prenom}
              onChange={handleClientInfoChange}
              autoComplete="given-name"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" } }}
            />
            {errors.prenom && (
              <FormHelperText
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.875rem" },
                }}
              >
                {errors.prenom}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.numero} fullWidth size="small">
            <InputLabel
              htmlFor="numero"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
              }}
            >
              Numéro de téléphone
            </InputLabel>
            <OutlinedInput
              id="numero"
              name="numero"
              label="Numéro de téléphone"
              value={clientInfo.numero}
              onChange={handleClientInfoChange}
              autoComplete="tel"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" } }}
            />
            {errors.numero && (
              <FormHelperText
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.875rem" },
                }}
              >
                {errors.numero}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.adresse} fullWidth size="small">
            <InputLabel
              htmlFor="adresse"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
              }}
            >
              Adresse
            </InputLabel>
            <OutlinedInput
              id="adresse"
              name="adresse"
              label="Adresse"
              value={clientInfo.adresse}
              onChange={handleClientInfoChange}
              autoComplete="street-address"
              multiline
              minRows={2}
              sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" } }}
            />
            {errors.adresse && (
              <FormHelperText
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.875rem" },
                }}
              >
                {errors.adresse}
              </FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: 1, sm: 1.5, md: 2 },
            py: { xs: 0.5, sm: 1, md: 1.5 },
          }}
        >
          <Button
            onClick={handleCloseModal}
            color="inherit"
            size="small"
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleValidate}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#176B87",
              color: "#fff",
              fontWeight: "bold",
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
            }}
            disabled={loading}
          >
            {loading ? "Validation..." : "Confirmer la commande"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PanierPage;
