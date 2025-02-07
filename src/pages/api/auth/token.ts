import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

interface AuthError extends Error {
  status?: number;
  code?: string;
}

export default withApiAuthRequired(async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('soy auth token o algo asi');
    const { accessToken } = await getAccessToken(req, res);
    console.log('access token directo de auth0/nextjs', accessToken);
    res.json({ accessToken });
  } catch (error: unknown) {
    const authError = error as AuthError;
    console.error(authError);
    res.status(authError.status || 500).json({
      code: authError.code,
      error: authError.message,
    });
  }
});
