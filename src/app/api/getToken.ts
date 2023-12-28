/**
 * Retrieves an access token from the Spotify API.
 *
 * Uses client credentials auth flow to authenticate and get a token.
 * Handles the HTTPS request and response to get the token.
 * Returns a Promise that resolves with the access token string.
 */
import * as https from "https";
import * as querystring from "querystring";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string;

if (!clientId || !clientSecret) {
  throw new Error(
    "Spotify API credentials not found in environment variables."
  );
}

const authOptions = {
  hostname: "accounts.spotify.com",
  path: "/api/token",
  method: "POST" as const,
  headers: {
    Authorization:
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const postData = querystring.stringify({
  grant_type: "client_credentials",
});

const getToken = () => {
  return new Promise<string>((resolve, reject) => {
    const req = https.request(authOptions, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          const token = result.access_token as string;
          resolve(token);
        } else {
          reject(`Error: ${res.statusCode} ${data}`);
        }
      });
    });

    req.on("error", (error: Error) => {
      reject(`Error: ${error.message}`);
    });

    req.write(postData);
    req.end();
  });
};

export default getToken;
