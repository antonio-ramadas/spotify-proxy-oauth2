# Spotify Proxy for OAuth2

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> Looking for a Slack Proxy for OAuth2? It is in [another repository](https://github.com/antonio-ramadas/slack-proxy-oauth2).

Dead simple proxy server to authenticate your apps on Spotify. No need to code anything. Just set environment variables and you are good to go!

> If you have problems understanding what is being done here, then have a look to the [Spotify OAuth2 documentation](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

The authorization flow implemented is _Authorization Code_. All the steps (except for the requests to the web api) are here implemented.

## Usage

This server is only useful to authenticate your apps. It removes your concern to hide development secrets (like `client_secret`) from the user.

In order for the server to properly work, you need to set the following environment variables:
 - `CLIENT_ID`
 - `CLIENT_SECRET`

Optionally, just for convenience, you can also set: 
 - `REDIRECT_URI`
 
These variables have the exact same meaning as in the Spotify API. The endpoints of the API are exactly the same as the Spotify API. Think of this repo as an augmenter to your requests where it add your sensitive data in the necessary requests. Please notice that **you still need to handle the responses** as there is not any kind of treatment. **This proxy is stateless** and does not store/cache anything.

## API

There are 3 routes for you to use:
 - `/authorize`
   - `GET` endpoint
   - Optional query parameters:
     - `redirect_uri`
     - `state`
     - `scope`
       - _space-separated list_
     - `show_dialog`
   - It redirects the user to `https://accounts.spotify.com/authorize` with the optional parameters you may have passed.
 - `/api/token`
   - `POST` endpoint
   - This endpoint changes its behaviour depending on the body parameter `grant_type`.
   - If `grant_type == 'authorization_code'`:
     - Mandatory body parameters:
       - `grant_type`
       - `code`
         - The one from the previous interaction
     - Optional body parameters:
       - `redirect_uri`
         - Must be the same as the one used in the previous interaction
   - If `grant_type == 'refresh_token'`:
     - Mandatory body parameters:
       - `grant_type`
       - `refresh_token`
   - It returns the response of `https://accounts.spotify.com/api/token` with the mandatory parameters and the optional ones you may have passed.
 - `/health`
   - `GET` endpoint which does not take any parameters.
   - Returns status `200` with `Alive!`.
   - Useful if Spotify is down and you want to diagnostic where the problem is.

## FAQ

### When should I use this?

Your side projects and similar. If you use it in a production environment, then it is recommended you make use of the `state` parameter. This repository shines when you are prototyping.

### Why should I use this?

When you pick up a project and want to do cool stuff, you will stumble on some configuration nightmare once you start communicating with multiple services. This repository just hides your secret keys. Hence, its simplicity. It is easy to pick up and use. There is even already integration with TravisCI (for Continuous Integration) and Heroku (for Deployment) ready for you to use. You can fork this repository and customize any way you want. Make a pull request if you think it will improve this repository. By the way, there is a Heroku deploy button at the top to be even easier to use. 

### How can I contribute?

I made this project to support my side projects. It fulfils my requirements (I'm not using it for anything really serious), but I am open to further improvement.

If you can think of anything, please share! Even if it is just an issue!
