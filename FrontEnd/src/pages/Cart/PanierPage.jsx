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
import panierIMG from "../../../src/assets/PAP_810.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const [reduction, setReduction] = useState(0); // en pourcentage
  const [promoError, setPromoError] = useState(""); // message d'erreur
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const price = 12.49;
  const shipping = 5.99;
  const sousTotal = price * quantity;
  const reductionMontant = sousTotal * (reduction / 100);
  const total = (sousTotal - reductionMontant + shipping).toFixed(2);

  // Simule les images du panier (à remplacer par les vraies images du client)
  const images = Array.from(
    { length: 9 },
    (_, i) => `/images/magnet${i + 1}.jpg`
  );

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  const handleValidate = () => {
    if (!validateFields()) return;

    const message = `\n Nouvelle commande Memora :\nNom : ${
      clientInfo.nom
    }\nPrénom : ${clientInfo.prenom}\nNuméro : ${
      clientInfo.numero
    }\nAdresse : ${clientInfo.adresse}\n\nImages :\n${images
      .map((img, i) => `Image ${i + 1} : ${window.location.origin}${img}`)
      .join("\n")}`;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/21699616660?text=${encodedMsg}`, "_blank");
    setOpenModal(false);
  };

  const handleApplyPromo = async () => {
    setPromoError("");
    setPromoApplied(false);
    setReduction(0);

    try {
      const res = await fetch("/api/checkPromo", {
        // adapte l'URL à ton backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promo }),
      });
      const data = await res.json();
      if (res.ok) {
        setReduction(data.reduction); // ex: 10 pour 10%
        setPromoApplied(true);
      } else {
        setPromoError(data.error || "Code invalide");
      }
    } catch (e) {
      setPromoError("Erreur serveur");
    }
  };

  // date de livraison
  const getDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 5);

    // Format en JJ/MM avec 0 devant si nécessaire
    const day = String(today.getDate()).padStart(2, "0");
    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const month = monthNames[today.getMonth()];
    return `${day} ${month}`;
  };

  const handleValiderPanier = () => {
    if (!auth.user) {
      setShowAuthModal(true);
    } else {
      setShowConfirm(true);
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
                                component="img"
                                src={panierIMG}
                                alt="Aperçu du panier"
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  borderRadius: 1,
                                }}
                              />
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
                              onClick={handleApplyPromo}
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
                      Livraison {getDeliveryDate()}
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
                {reduction > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "green",
                    }}
                  >
                    <Typography>Réduction ({reduction}%)</Typography>
                    <Typography>-{reductionMontant.toFixed(2)} €</Typography>
                  </Box>
                )}
                {promoError && (
                  <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                    {promoError}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    mt: { xs: 1, sm: 1.5, md: 2 },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                  >
                    Valider mon panier
                  </Button>
                </Box>
              </Paper>
            </Box>
          </section>
        </Box>
      </main>
      <Footer />
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Informations client</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            name="nom"
            value={clientInfo.nom}
            onChange={handleClientInfoChange}
            fullWidth
            margin="normal"
            error={!!errors.nom}
            helperText={errors.nom}
          />
          <TextField
            label="Prénom"
            name="prenom"
            value={clientInfo.prenom}
            onChange={handleClientInfoChange}
            fullWidth
            margin="normal"
            error={!!errors.prenom}
            helperText={errors.prenom}
          />
          <TextField
            label="Numéro"
            name="numero"
            value={clientInfo.numero}
            onChange={handleClientInfoChange}
            fullWidth
            margin="normal"
            error={!!errors.numero}
            helperText={errors.numero}
          />
          <TextField
            label="Adresse"
            name="adresse"
            value={clientInfo.adresse}
            onChange={handleClientInfoChange}
            fullWidth
            margin="normal"
            error={!!errors.adresse}
            helperText={errors.adresse}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleValidate} color="primary" variant="contained">
            Envoyer sur WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal de confirmation */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>Confirmer la commande</DialogTitle>
        <DialogContent>
          <Typography>
            Voulez-vous vraiment confirmer votre commande ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={async () => {
              setShowConfirm(false);
              await handleValidate();
              setShowSuccess(true);
            }}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal de succès */}
      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <DialogTitle>Commande validée !</DialogTitle>
        <DialogContent>
          <Typography>Votre commande a bien été enregistrée.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowSuccess(false)}
            color="primary"
            autoFocus
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal d'authentification */}
      <Dialog open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <DialogTitle>Connexion requise</DialogTitle>
        <DialogContent>
          <Typography>
            Vous devez avoir un compte pour valider votre commande.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAuthModal(false);
              navigate("/login");
            }}
            color="primary"
          >
            Se connecter
          </Button>
          <Button
            onClick={() => {
              setShowAuthModal(false);
              navigate("/register");
            }}
            color="secondary"
          >
            S'inscrire
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PanierPage;
