import { magicAdmin } from '../../lib/magic-server';
import { clearUserCookie } from '../../lib/cookies';

export default async function logout(req, res) {
    try {
        if (!req.cookies.token) {
            return res.status(401).json({ message: 'User is not logged in' });
        }

        const token = req.cookies.token;
        const userId = await verifyToken(token);
        // clear token from cookie
        clearUserCookie(res);
        try {
            // logout magic
            await magicAdmin.users.logoutByIssuer(userId);
        } catch (error) {
            console.log("User's session with Magic already expired");
            console.error('Error occurred while logging out magic user', error);
        }
        // redirect to login page
        res.writeHead(302, { Location: '/login' });
        res.end();
    } catch (error) {
        console.log({ error });
        res.status(401).json({ message: 'user is not loged in' });
    }
}
