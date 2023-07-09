import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { GITLAB_APP_ID, API_URL } = process.env;
  res.redirect(
    `https://gitlab.com/oauth/authorize?client_id=${GITLAB_APP_ID}&redirect_uri=${API_URL}/api/oauth/gitlab&response_type=code&scope=sudo+profile+email`
  );
}
