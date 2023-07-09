import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  { query: { code } }: NextApiRequest,
  res: NextApiResponse
) {
  if (!code) {
    res.status(400).json({});
  } else {
    const { GITLAB_APP_ID, GITLAB_APP_SECRET, API_URL } = process.env;
    try {
      const {
        data: { access_token, refresh_token },
      } = await axios.post<{ access_token: string; refresh_token: string }>(
        "https://gitlab.com/oauth/token",
        {
          client_id: GITLAB_APP_ID,
          client_secret: GITLAB_APP_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: `${API_URL}/api/oauth/gitlab`,
        },
        { headers: { Accept: "application/json" } }
      );
      res.redirect(
        `dogit://oauth/gitlab?accessToken=${access_token}&refreshToken=${refresh_token}`
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.code, error.message, error.response?.data);
      }
      res.status(401).json({});
    }
  }
}
