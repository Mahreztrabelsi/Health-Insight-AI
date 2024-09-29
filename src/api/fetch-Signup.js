export default function handler(req, res) {
    if (req.method === 'get') {
        res.json(userstoredData);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
