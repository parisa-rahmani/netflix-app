import jwt from 'jsonwebtoken';

export async function verifyToken(token) {
    if (token) {
        const decodedToken = jwt.verify(
            token,
            Buffer.from(process.env.JWT_SECRET, 'base64')
        );
        const userId = decodedToken?.issuer;
        return userId;
    } else {
        return null;
    }
}
