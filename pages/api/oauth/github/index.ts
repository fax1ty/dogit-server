import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  { query: { code } }: NextApiRequest,
  res: NextApiResponse
) {
  if (!code) {
    res.status(400).json({});
  } else {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
    const {
      data: { error, access_token },
    } = await axios.post<{ access_token?: string; error?: string }>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
    if (error) {
      if (error === "bad_verification_code") res.status(401).json({});
      else res.status(500).json({});
    } else {
      res.redirect(`dogit://oauth/github?accessToken=${access_token}`);
    }
  }
}
