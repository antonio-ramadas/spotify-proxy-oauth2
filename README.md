# Update README.md to current repository

# Spotify Proxy for OAuth2

Dead simple proxy server to authenticate your apps on Spotify. No need to code anything. Just set environment variables and you are good to go!

> If you have problems understanding what is being done here, then have a look to the [Spotify OAuth2 documentation](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

## Usage

This server is only useful to authenticate your apps. It removes your concern to hide development secrets (like `client_secret`) from the user.

In order for the server to properly work, you need to set the following environment variables:
 - `CLIENT_ID`
 - `CLIENT_SECRET`
 - `REDIRECT_URI`
 
These variables have the exact same meaning as in the Spotify API. The endpoints of the API are exactly the same as the Spotify API. Think of this repo as an augmenter to your requests where it add your sensitive data in the necessary requests. Please notice that **you still need to handle the responses** as there is not any kind of treatment. **This proxy is stateless** and does not store/cache anything.

## API

There are 3 routes for you to use:
 - `/authorize`
   - `GET` endpoint which takes as optional parameters:
     - `redirect_uri`
     - `state`
     - `scope`
       - _space-separated list_
     - `show_dialog`
   - It redirects the user to `https://accounts.spotify.com/authorize` with the mandatory parameters and the optional ones you may have passed.
 - `/health`
   - `GET` endpoint which does not take any parameters.
   - Returns status `200` with `Alive!`.
   - Useful if Slack is down and you want to diagnostic where the problem is.

## FAQ (REVIEW!!!)

### When should I use this?

Your side projects and similar. Do not use for production or any more serious endeavours. For instance, `state` is not taken into account here. You will be vulnerable to attacks. This repository shines when you are prototyping.

### Why should I use this?

When you pick up a project and want to do cool stuff, you will stumble on some configuration nightmare once you start communicating with multiple services. This repository just hides your secret keys. Hence, its simplicity. It is easy to pick up and use. There is even already integration with TravisCI (for Continuous Integration) and Heroku (for Deployment) ready for you to use. You can fork this repository and customize any way you want. Make a pull request if you think it will improve this repository. By the way, there is a Heroku deploy button at the top to be even easier to use. 

### How can I contribute?

I made this project to support my side projects. It fulfils my requirements (I'm not using it for anything really serious), but I am open to further improvement and I see some points where it can be improved:
 - Have a `state` parameter.
 - Have a `redirect_uri` parameter.

If you can think of anything else, please share! Even if it is just an issue!
