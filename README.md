# Update README.md to current repository

# _Incomplete_ Slack Proxy for OAuth2

Dead simple proxy server to authenticate your apps on Slack. No need to code anything. Just set environment variables and you are good to go!

> If you have problems understanding what is being done here, then have a look to the [Slack OAuth2 documentation](https://api.slack.com/docs/oauth).

## Usage

This server is only useful to authenticate your apps. It removes your concern to hide development secrets (like `client_secret`) from the user. This is **not** a complete API to communicate to Slack.

In order for the server to properly work, you need to set the following environment variables:
 - `CLIENT_ID`
 - `CLIENT_SECRET`
 - `SCOPE`
 - `TEAM`
 
These variables have the exact same meaning as in the Slack API.

## API

There are 3 routes for you to use:
 - `/oauth/authorize`
   - `GET` endpoint which does not take any parameters.
   - It redirects the user to `https://slack.com/oauth/authorize` with `client_id`, `scope` and `team`.
 - `/api/oauth.access`
   - `GET` endpoint which handles a single parameter: `code`.
   - You should set `code` to the code Slack gave you from the previous interaction. 
 - `/health`
   - `GET` endpoint which does not take any parameters.
   - Returns status `200` with `Alive!`.
   - Useful if Slack is down and you want to diagnostic where the problem is.

> The first 2 of the routes have the same path as Slack OAuth2 API.

## FAQ

### When should I use this?

Your side projects and similar. Do not use for production or any more serious endeavours. For instance, `state` is not taken into account here. You will be vulnerable to attacks. This repository shines when you are prototyping.

### Why should I use this?

When you pick up a project and want to do cool stuff, you will stumble on some configuration nightmare once you start communicating with multiple services. This repository just hides your secret keys. Hence, its simplicity. It is easy to pick up and use. There is even already integration with TravisCI (for Continuous Integration) and Heroku (for Deployment) ready for you to use. You can fork this repository and customize any way you want. Make a pull request if you think it will improve this repository. By the way, there is a Heroku deploy button at the top to be even easier to use. 

### How can I contribute?

I made this project to support my side projects. It fulfils my requirements (I'm not using it for anything really serious), but I am open to further improvement and I see some points where it can be improved:
 - Have a `state` parameter.
 - Have a `redirect_uri` parameter.

If you can think of anything else, please share! Even if it is just an issue!
