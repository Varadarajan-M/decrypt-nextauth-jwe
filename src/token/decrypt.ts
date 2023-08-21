import hkdf from '@panva/hkdf';
import { jwtDecrypt } from 'jose';
/**
 * Decrypts a next-auth JWE token using a provided secret and returns the payload.
 *
 * @async
 * @param {string} token - Next auth JWE token.
 * @param {string} secret - Next Auth Secret Key.
 * @returns {Promise<object|undefined>} The decrypted payload object, or undefined if decryption fails.
 * @throws {Error} If an error occurs during the decryption process.
 */
const decrypt = async (token: string, secret: string) => {
	if (!token || !secret) return undefined;

	const NEXTAUTH_INFO = 'NextAuth.js Generated Encryption Key';
	const NEXTAUTH_SALTROUNDS = 32;
	const NEXTAUTH_ALGO = 'sha256';
	const CLOCKTOLERANCE = 15;

	try {
		const encryptionSecret = await hkdf(
			NEXTAUTH_ALGO,
			secret,
			'',
			NEXTAUTH_INFO,
			NEXTAUTH_SALTROUNDS,
		);

		const { payload } = await jwtDecrypt(token, encryptionSecret, {
			clockTolerance: CLOCKTOLERANCE,
		});

		return payload;
	} catch (error) {
		console.error('Error occured:', error);
		return undefined;
	}
};

export { decrypt };
