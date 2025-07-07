const handleValidate = () => {
  if (!validateFields()) return;

  const message = `Nouvelle commande Memora :\nNom : ${
    clientInfo.nom
  }\nPrénom : ${clientInfo.prenom}\nNuméro : ${clientInfo.numero}\nAdresse : ${
    clientInfo.adresse
  }\n\nImages :\n${images
    .map((img, i) => `Image ${i + 1} : ${window.location.origin}${img}`)
    .join("\\n")}`;
  const encodedMsg = encodeURIComponent(message);
  window.open(`https://wa.me/21699616660?text=${encodedMsg}`, "_blank");
  setOpenModal(false);
};
