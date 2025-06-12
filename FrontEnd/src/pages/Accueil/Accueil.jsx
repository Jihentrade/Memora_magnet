import React from "react";
import "./styleAccueil.css";
import Couverture from "../../assets/cov.png";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import customerImage1 from "../../assets/1.jpg";
import customerImage2 from "../../assets/3.jpg";
import customerImage3 from "../../assets/4.jpg";
import customerImage4 from "../../assets/3b4e9e043cf72fe7b89c1d77459eaad3.jpg";
import customerImage5 from "../../assets/5.jpg";
import customerImage6 from "../../assets/8.jpg";
import customerImage7 from "../../assets/6.jpg";
import customerImage8 from "../../assets/de7162838daa7d4d0030c502aa0333e2.jpg";
import HowToWork from "../../components/HowItWorks";
import ThreeByTwoGrid from "../../components/ThreeByTwoGrid/ThreeByTwoGrid";
import Service from "../../components/Serviice/Services";
import Footer from "../../components/footer/footer";
import AboutUs from "../../components/AboutUs/aboutUs";
import Navbar from "../../components/Navbar/navbar";

const Accueil = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const customerImages = [
    customerImage1,
    customerImage2,
    customerImage3,
    customerImage4,
    customerImage5,
    customerImage6,
    customerImage7,
    customerImage8,
  ];
  const navigate = useNavigate();

  const handleButtonClick = () => {
    window.scrollTo(0, 0);
    navigate("/aimants-photo-carrés");
  };

  return (
    <div>
      <Navbar />
      <div
        className="container"
        style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={Couverture}
            alt=""
            loading="lazy"
            style={{
              // objectFit: "cover",
             
              width: "100%",
              height:"100%",
              maxHeight: isMobile ? "300px" : "600px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              padding: isMobile ? "20px" : "40px",
            }}
          >
            <div style={{ maxWidth: "800px", width: "100%" }}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                sx={{
                  color: "black",
                  marginBottom: "5px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Aimants Photo Personnalisés de Haute Qualité
              </Typography>
              <Typography
                sx={{
                  marginTop: "10px",
                  textAlign: "center",
                  color: "#333",
                  fontSize: isMobile ? "16px" : "18px",
                  maxWidth: "500px",
                  margin: "0 auto",
                  padding: isMobile ? "0 20px" : "0",
                }}
              >
                Chez Memora, nous nous engageons à vous offrir des produits de
                qualité supérieure.
                <br />
                Nous utilisons les meilleurs matériaux et encres pour imprimer
                des aimants photo personnalisés avec vos précieuses photos.
              </Typography>
            </div>
            <Button
              variant="contained"
              onClick={handleButtonClick}
              sx={{
                marginTop: "20px",
                backgroundColor: "#597E52",
                color: "white",
                padding: isMobile ? "8px 16px" : "12px 24px",
                fontSize: isMobile ? "14px" : "16px",
                "&:hover": {
                  backgroundColor: "#597E52",
                },
                "&:focus": {
                  backgroundColor: "#597E52",
                },
                "&:active": {
                  backgroundColor: "#597E52",
                },
              }}
            >
              SÉLECTIONNER DES PHOTOS
            </Button>

            <Box sx={{ width: "100%", mt: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontSize: isMobile ? "20px" : "24px",
                }}
              >
                Photos de produits clients
              </Typography>
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                justifyContent="center"
                sx={{ px: isMobile ? 1 : 2 }}
              >
                {customerImages.map((image, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Image client ${index}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "380px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box sx={{ width: "100%", mt: isMobile ? "40px" : "70px" }}>
              <HowToWork />
            </Box>
            <Box sx={{ width: "100%", mt: isMobile ? "40px" : "70px" }}>
              <ThreeByTwoGrid />
            </Box>
          </div>
        </Box>
        <Box sx={{ mt: isMobile ? "40px" : "70px" }}>
          <AboutUs />
          <Service />
          <Footer />
        </Box>
      </div>
    </div>
  );
};

export default Accueil;
