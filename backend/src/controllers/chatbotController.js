export const handleChat = async (req, res, next) => {
    const { query } = req.body;
    try {

        if (/how to donate/i.test(query)) {
          return res.json({ reply: 'Visita https://myissues.org/donate para donar.' });
        }
        
        res.json({ reply: '¿En qué puedo ayudarte?' });
    } catch (error) {
        next(error)
    }
}
