# NextAuth JWE Decrypt

This package is created for personal purposes as a utility for decrypting the JWE issued by NextAuth when using the token in an external API.

### USAGE

```
import decrypt from 'nextauth-jwe-decrypt';

const nextauthSecret = process.env.NEXTAUTH_SECRET;


// Token can be extracted with getToken({req,raw:true}) inside api routes or from
// `next-auth.session.token` cookie.

const nextauthToken = 'your-next-auth-token-here'

const payload = await decrypt(nextauthToken,nextauthSecret) // returns undefined if no secret is provided

doSomethingWithPayload(payload)

```
