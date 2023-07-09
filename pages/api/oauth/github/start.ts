import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { GITHUB_CLIENT_ID, API_URL } = process.env;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${API_URL}/api/oauth/github&scope=admin:gpg_key,admin:public_key,read:user,user:email`
  );
}
