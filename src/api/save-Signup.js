let userstoredData = {};

export default function handler(req, res) {
    if (req.method === 'post') {
        userstoredData = req.body;
        res.json({ message: 'User Data saved successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
