import hkdf from '@panva/hkdf';
import { jwtDecrypt } from 'jose';

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
