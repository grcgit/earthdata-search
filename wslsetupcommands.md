# Running local frontend against local cmr

## Development Envrionment
- Windows 10
- Wsl 2 
- Visual code with remote development extension
- Docker Desktop with WSL2 support enabled for distro

## WSL Distro Prerequisites
### NVM NPM NODE
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh`

`nvm install 12.16.3`

`npm install -g npm@8.4.0 `
or
`npm install -g npm@latest`

`npm install -g serverless@latest`

From repo root
`npm install`

## Running frontend
- Create configuration files
`cp secret.config.json.example secret.config.json`
`cp static.config.json overrideStatic.config.json`

Run frontend in dev mode
`npm run start`

Build static files and run production server
`npm run build`
`cd ${REPO_ROOT}/server`
`npm run prod`

Run Serverless backend
From repo root
`serverless offline`