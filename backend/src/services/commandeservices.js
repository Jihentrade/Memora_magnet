const commandeModel = require("../models/commandemodel");
//*********************************************************** */
const createCommande = async (commandeData) => {
  const commande = new commandeModel(commandeData);
  const result = await commande.save();
  return result;
};
//*************************************************************************** */
//find All commande
async function findAll() {
  const commandes = await commandeModel.find();
  return commandes;
}
//*************************************************************************** */

const searchCommande = async (id) => {
  const commandes = await commandeModel.findOne({ _id: id });

  return commandes;
};
//*************************************************************************** */
const deleteCommande = async (_id) => {
  return commandeModel.deleteOne({ _id: _id });
};
//*************************************************************************** */
const updateCommande = async (id, commande) => {
  try {
    const updatedCommande = await commandeModel.findByIdAndUpdate(
      { _id: id },
      commande,
      {
        new: true,
      }
    );
    return updatedCommande;
  } catch (err) {
    throw new Error(err.message);
  }
};
//**************************************************************************** */
module.exports = {
  createCommande,
  findAll,
  searchCommande,
  deleteCommande,
  updateCommande,
};
