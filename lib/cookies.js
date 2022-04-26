import cookie from 'cookie';

export function setUserCookie(token, res) {
    const maxAge = 7 * 24 * 60 * 60;

    const setterCookie = cookie.serialize('token', token, {
        maxAge: maxAge,
        expires: new Date(Date.now() + maxAge * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
    return res.setHeader('Set-Cookie', setterCookie);
}
export function clearUserCookie(res) {
    const value = cookie.serialize('token', '', {
        maxAge: -1,
        path: '/',
    });
    return res.setHeader('Set-Cookie', value);
}
