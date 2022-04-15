import { magicAdmin } from '../../utils/magic-server';
import { clearUserCookie } from '../../utils/cookies';

export default async function logout(req, res) {
    if (req.method === 'POST') {
        if (!req.cookies.token) {
            return res.status(401).json({ message: 'User is not logged in' });
        }
        try {
            const auth = req.headers.authorization;
            // token is after 7 char rhan bearer
            const didToken = auth ? auth.substr(7) : '';
            // invoke magic
            clearUserCookie(res);

            try {
                // logout magic
                await magicAdmin.users.logoutByToken(didToken);
            } catch (error) {
                console.log("User's session with Magic already expired");
                console.error(
                    'Error occurred while logging out magic user',
                    error
                );
            }
            // redirect to login page
            res.writeHead(302, { Location: '/login' });
            res.end();
        } catch (error) {
            console.log({ error });
            res.status(401).json({ message: 'user is not loged in' });
        }
    } else {
        res.send({ success: false, msg: 'something went wrong' });
    }
}
