# activity-bot
Discord bot to track and report activity stats for the members of your server.
## Setup 
Put `config.json` into the project root directory. See Sample `config.json` section below for the required fields.

## Run
```bash
tsx .
```
or 
```bash
./run.sh
```

## Sample `config.json`
`config.json` must have the following fields:
```json
{
	"token": "your-token",
	"clientId": "your-application-id",
	"guildId": "your-guild-id"
}
```
