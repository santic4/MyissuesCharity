import { Campaign, Donation, User } from "../models/index.js";
import { processPayment } from "../services/payments/paymentsServices.js";

export const getAllDonation = async (req, res, next) => {
    try {
      console.log('inside get donations')
        const donations = await Donation.findAll({ order: [["donated_at", "DESC"]]});

        if(!donations) throw new Error('Donations not found.')
        res.json(donations);
    } catch (error) {
        next(error)
    }
}

export const postDonation = async (req, res, next) => {
  try {
    const donorId = req.user;

    const { campaignId, amount, method } = req.body;

    const user = await User.findByPk(donorId.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const transactionId = await processPayment(method, amount);

    const donation = await Donation.create({
      user_id: donorId.id,
      campaign_id: campaignId,
      amount,
      payment_method: method,
      transaction_id: transactionId
    });

    const camp = await Campaign.findByPk(campaignId);
    camp.collected_amount = parseFloat(camp.collected_amount) + parseFloat(amount);
  
    await camp.save();

    return res.status(201).json({ donation });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al procesar donación' });
  }
};