import React from "react";
import {
  Typography,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Link,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Logo from "../../assets/logo.png";
import "./footer.css";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFFFEC",
        padding: { xs: "20px 16px", sm: "30px 24px", md: "40px 32px" },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #176B87 0%, #597E52 100%)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            margin: "0 auto",
          }}
        >
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                mb: { xs: 1, md: 0 },
              }}
            >
              <img
                src={Logo}
                alt="Memora - Aimants Photo Personnalisés"
                style={{
                  width: isMobile ? "100px" : "120px",
                  marginBottom: "12px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  textAlign: { xs: "center", md: "left" },
                  maxWidth: "200px",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  lineHeight: 1.4,
                }}
              >
                Créez des souvenirs durables avec nos aimants photo
                personnalisés.
              </Typography>
            </Box>
          </Grid>

          {/* Information Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "#176B87",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                À Propos
              </Typography>
              <Box
                component="nav"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Link
                  href="/notre-entreprise"
                  underline="none"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    "&:hover": {
                      color: "#176B87",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Notre Histoire
                </Link>
                <Link
                  href="/contactezNous"
                  underline="none"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    "&:hover": {
                      color: "#176B87",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Contactez-Nous
                </Link>
                <Link
                  href="/mentions-legales"
                  underline="none"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    "&:hover": {
                      color: "#176B87",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Mentions Légales
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "#176B87",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Suivez-Nous
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Link
                  href="https://instagram.com/memora"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#666",
                    "&:hover": {
                      color: "#176B87",
                    },
                  }}
                >
                  <InstagramIcon
                    sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" } }}
                  />
                </Link>
                <Link
                  href="https://facebook.com/memora"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#666",
                    "&:hover": {
                      color: "#176B87",
                    },
                  }}
                >
                  <FacebookIcon
                    sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" } }}
                  />
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "#176B87",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                Contact
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <LocationOnIcon
                    sx={{
                      color: "#176B87",
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                      mt: 0.5,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    Boulevard Docteur Taieb Hachicha Messadine, Tunisie
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <MailOutlineIcon
                    sx={{
                      color: "#176B87",
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                    }}
                  />
                  <Link
                    href="mailto:memero@gmail.com"
                    underline="none"
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      "&:hover": {
                        color: "#176B87",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    memero@gmail.com
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PhoneIcon
                    sx={{
                      color: "#176B87",
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                    }}
                  />
                  <Link
                    href="tel:+21611111111"
                    underline="none"
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      "&:hover": {
                        color: "#176B87",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    11 111 111
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
