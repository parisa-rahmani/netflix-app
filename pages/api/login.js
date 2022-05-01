import { magicAdmin } from '../../lib/magic-server';
import jwt from 'jsonwebtoken';
import { isNewUser, createNewUser } from '../../lib/hasura';
import { setUserCookie } from '../../lib/cookies';

export default async function login(req, res) {
    if (req.method === 'POST') {
        try {
            const auth = req.headers.authorization;
            // token is after 7 char rhan bearer
            const didToken = auth ? auth.substr(7) : '';
            // invoke magic
            const metaData = await magicAdmin.users.getMetadataByToken(
                didToken
            );
            //   create jwt
            const token = jwt.sign(
                {
                    ...metaData,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
                    'https://hasura.io/jwt/claims': {
                        'x-hasura-allowed-roles': ['user', 'admin'],
                        'x-hasura-default-role': 'user',
                        'x-hasura-user-id': `${metaData.issuer}`,
                    },
                },
                process.env.JWT_SECRET,
                { algorithm: 'HS256' }
            );

            const isNewUserQuery = await isNewUser(token, metaData);
            // create user
            isNewUserQuery && (await createNewUser(token, metaData));
            // set cookie
            setUserCookie(token, res);

            res.status(200).send({ success: true });
        } catch (error) {
            res.status(500).send({ success: false, error });
        }
    } else {
        res.send({ success: false, msg: 'something went wrong' });
    }
}
