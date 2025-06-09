import React from "react";
import "./styleDash.css";
import { axiosPrivate } from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
// import Chart from "./components/Commande_chart";
import { Box } from "@mui/material";
import clientIcon from "../../assets/clienticon.png";
import icondevis from "../../assets/411709.png";
import produit from "../../assets/produit.png";
import commande from "../../assets/commande.png";

const Dashboard = () => {
  const [totalProduit, setTotalProduit] = useState(0);
  const [totalCommandes, setTotalCommande] = useState(0);
  const [Bonlivraison, setBonlivraison] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  //*************************************************Partie Commande ****************************/
  const [query, setQuery] = useState("");
  const [commandes, setCommandes] = React.useState([]);
  const filteredCommande = commandes.filter((commande) => {
    return Object.values(commande).some((value) => {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    });
  });
  useEffect(() => {
    axiosPrivate
      .get("/commande/findAllCommande")
      .then((response) => {
        const commandeWithId = response.data.commandes.map((commande) => {
          return { ...commande, id: commande._id };
        });

        setCommandes(commandeWithId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //******************************************************************************************* */
  const navigate = useNavigate();
  //vers la page Clients
  const handleClientClick = () => {
    navigate("/client");
  };
  //vers la page Produit
  const handleProduitClick = () => {
    navigate("/produit");
  };
  //vers la page commande
  const handleCommandeClick = () => {
    navigate("/commande");
  };
  const handleLivraisonClick = () => {
    navigate("/livraison");
  };
  //***************************************************************************************** */
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axiosPrivate.get("/produit/findAllProduit");

        const produits = response.data.produits;
        const total = produits.length;
        setTotalProduit(total);
      } catch (error) {
        console.error("Error fetching produit:", error);
      }
    };

    fetchProduits();
  }, []);
  //*************************************************************************************** */
  //***************************************************************************************** */
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await axiosPrivate.get("/commande/findAllCommande");

        const commandes = response.data.commandes;
        const total = commandes.length;
        setTotalCommande(total);
      } catch (error) {
        console.error("Error fetching commande:", error);
      }
    };

    fetchCommande();
  }, []);

  //*************************************************************************************** */
  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const response = await axiosPrivate.get("/recu/getAllRecu");

        const bonLivraison = response.data;
        const total = bonLivraison.length;
        setBonlivraison(total);
      } catch (error) {
        console.error("Error fetching bonLivraison:", error);
      }
    };

    fetchDevis();
  }, []);

  //***************************************************************************************** */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosPrivate.get("/client/findAll");
        const clients = response.data.clients;
        const total = clients.length;
        setTotalClients(total);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);
  return (
    <>
      <Navbar />
      <div className="g-container">
        <div className="containerDash">
          <div
            className="card-stat"
            style={{
              borderBottom: "3px solid #176B87",
            }}
          >
            <div
              className="card-title-card-stat"
              style={{ backgroundColor: "#176B87" }}
            >
              <img src={produit} alt="icon" width="20%" />
              <label className="title-nl-style">Produit</label>
            </div>
            <div className="nbr-nl-style">{totalProduit} Produit</div>
            <a
              className="btn-card-stat"
              style={{ border: "1px solid #176B87" }}
              onClick={handleProduitClick}
            >
              Acceder
            </a>
          </div>
          <div
            className="card-stat"
            style={{ borderBottom: "3px solid #86B6F6" }}
          >
            <div
              className="card-title-card-stat"
              style={{ backgroundColor: "#86B6F6" }}
            >
              <img src={icondevis} alt="icon" width="20%" />
              <label className="title-nl-style">Bon de livraison</label>
            </div>
            <div className="nbr-nl-style">{Bonlivraison} Bon livraison</div>
            <a
              className="btn-card-stat"
              style={{ border: "1px solid #86B6F6" }}
              onClick={handleLivraisonClick}
            >
              Acceder
            </a>
          </div>

          <div
            className="card-stat"
            style={{ borderBottom: "3px solid #83C0C1" }}
          >
            <div
              className="card-title-card-stat"
              style={{ backgroundColor: "#83C0C1" }}
            >
              <img src={commande} alt="icon" width="16%" />
              <label className="title-nl-style">Commande</label>
            </div>
            <div className="nbr-nl-style">{totalCommandes} Commande</div>
            <a
              className="btn-card-stat"
              style={{ border: "1px solid #83C0C1" }}
              onClick={handleCommandeClick}
            >
              Acceder
            </a>
          </div>
          <div
            className="card-stat"
            style={{ borderBottom: "3px solid #79B4B7" }}
          >
            <div
              className="card-title-card-stat"
              style={{ backgroundColor: "#79B4B7" }}
            >
              <img src={clientIcon} alt="icon" width="20%" />

              <label className="title-nl-style">Client</label>
            </div>
            <div className="nbr-nl-style">{totalClients} Clients</div>
            <a
              className="btn-card-stat"
              style={{ border: "1px solid #79B4B7" }}
              onClick={handleClientClick}
            >
              Acceder
            </a>
          </div>
        </div>
        <div className="container" style={{ display: "flex" }}>
          <div className="container" style={{ display: "block" }}>
            {/* <div
              className="card-stat"
              style={{
                borderBottom: "3px solid #6958ff",
                // marginLeft: "-250px",
                width: "950px",
                marginTop: "-50px",
                height: "480px",
              }}
            >
              <Box
                sx={{
                  marginTop: "3px",
                  width: "900px",
                  // marginLeft: "-120px",
                }}
              >
                <Chart />
              </Box>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
