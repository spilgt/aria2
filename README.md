# telegram-drive-bot

This is a Telegram bot that uses [aria2](https://github.com/spilgt/aria2) to download files over BitTorrent / HTTP(S) and uploads them to your Google Drive. This can be useful for downloading from slow servers. There are some features to try to reduce piracy.

# Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Limitations

This bot is meant to be used in small, closed groups. So, once deployed, it only works in whitelisted groups. Also, it does not scale, so only one file can be downloaded at a time. This reduces the load on the server running the bot. Download queuing is planned, but not implemented yet.

### Warning

There is little preventing users from using this to mirror pirated content. Hence, make sure that only trusted groups are whitelisted in `AUTHORIZED_CHATS` <b>BUT ITS CURRENTLY NOT WORKING!!!!! YOU CAN ONLY USE THE BOT IN PM</b>

### Bot commands

* `/mirrorit <url>` : Download from the given URL and upload it to Google Drive. <url> can be HTTP(S), a BitTorrent magnet, or a HTTP(S) url to a BitTorrent .torrent file. A status message will be shown and updated while downloading.
* `/mirrorTar <url>` : Same as `/mirror`, but archive multiple files into a tar before uploading it.
* `/mirroritStatus` : Send a status message about the current download.
* `/stopit` : Cancel the current mirroring task. Only the person who started the task, SUDO_USERS, and chat admins can use this command.
* `/search <filename>` : Send links to downloads with the `filename` substring in the name. In case of too many downloads, only show the most recent few. 
* `/source` : Sends the source code of the bot
* `/ping` : Tests the connection with Telegram's API

### Pre-installation

1. [Create a new bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot) using Telegram's BotFather and copy your TOKEN.

2. Optionally, also change the `setprivacy` attribute to `disabled` from BotFather. This allows the bot to be more cleaner about how it deletes status messages.

3. Add the bot to your groups and optionally, give it the permission to delete messages. This permission is used to clean up status request messages from users. Not granting it will quickly fill the chat with useless messages from users.

4. Install [aria2](https://github.com/spilgt/aria2).
   * For Ubuntu:
     `sudo apt install aria2 node.js npm`
    * For Termux:
      `pkg install aria2 nodejs npm`

5. Get Drive folder ID:

   * Visit [Google Drive](https://drive.google.com).
   * Create a new folder. The bot will upload files inside this folder.
   * Open the folder.
   * The URL will be something like `https://drive.google.com/drive/u/0/folders/012a_345bcdefghijk`. Copy the part after `folders/` (`012a_345bcdefghijk`). This is the `GDRIVE_PARENT_DIR_ID` that you'll need in step 5 of the Installation section.

### Installation
( Preferably Do this in termux to get the `credentials.json` it will automatically generate after you enter the code from the url step 10)

1. Clone the repo:

   ```bash
   git clone https://github.com/spilgt/aria2
   cd aria2
   ```

2. Run `npm install`

3. Configure the aria2 startup script: 

   * `nano aria.sh`
   * `ARIA_RPC_SECRET` (defined in line 1) is the secret (password) used to connect to aria2. Set this to whatever you want, and save the file with `ctrl + x`.

4. Configure the bot:

   * `nano .constants.js`
   * Now replace the placeholder values in this file with your values. Use the `Constants description` section below for reference.

5. Set up OAuth:

   * Visit the [Google Cloud Console](https://console.developers.google.com/apis/credentials)
   * Go to the OAuth Consent tab, fill it, and save.
   * Go to the Credentials tab and click Create Credentials -> OAuth Client ID
   * Choose Other and Create.
   * Use the download button to download your credentials.
   * Move that file to the root of aria-telegram-mirror-bot, and rename it to `client_secret.json`

6. Enable the Drive API:

   * Visit the [Google API Library](https://console.developers.google.com/apis/library) page.
   * Search for Drive.
   * Make sure that it's enabled. Enable it if not.

7. Start aria2 with `./aria.sh`

8. Start the bot with `npm start`

9. Open Telegram, and send `/mirrorit https://raw.githubusercontent.com/therealme1/aria2/master/README.md` to the bot.

10. In the terminal, it'll ask you to visit an authentication URL. Visit it, grant access, copy the code on that page, and paste it in the terminal.

Note:- This will create a file named `credentials.json` which is required in the next step

Let's see the next steps

### Step to make it ready for heroku

After the above installation is done you will see the bot running...now lets make it ready for heroku

1. You will see 2 main files required i.e `client_secret.json` and `credentials.json` these are required to be uploaded on the repo to make gdrive upload work
2. Run `cp client_secret.json /sdcard/` and `cp credentials.json /sdcard/` You will find the files in internal storage of your phone Now upload them to the github repo and deploy

### Constants description

This is a description of the fields in .constants.js:

* `TOKEN`: This is the Telegram bot token that you will get from Botfather in step 1 of Pre-installation.
* `ARIA_SECRET`: This is the password used to connect to the aria2 RPC. You will get this from step 3 of Installation.
* `ARIA_DOWNLOAD_LOCATION`: This is the directory that aria2 will download files into, before uploading them. Make sure that there is no trailing "/" in this path. The suggested path is `/path/to/aria-telegram-mirror-bot/downloads`
* `ARIA_DOWNLOAD_LOCATION_ROOT`: This is the mountpoint that contains ARIA_DOWNLOAD_LOCATION. This is used internally to calculate the space available before downloading.
* `ARIA_FILTERED_DOMAINS`: The bot will refuse to download files from these domains. Can be an empty list.
* `ARIA_FILTERED_FILENAMES`: The bot will refuse to completely download (or if already downloaded, then upload) files with any of these substrings in the file/top level directory name. Can be an empty list or left undefined.
* `GDRIVE_PARENT_DIR_ID`: This is the ID of the Google Drive folder that files will be uploaded into. You will get this from step 5 of Pre-installation.
* `SUDO_USERS`: This is a list of Telegram user IDs. These users can use the bot in any chat. Can be an empty list, if AUTHORIZED_CHATS is not empty.
* `AUTHORIZED_CHATS`:<b>THIS FUNCTION NEEDS TO BE REPAIRED SO PUT ANYTHING ON THIS!!!!!! IT WONT WORK</b>  This is a list of Telegram Chat IDs. Anyone in these chats can use the bot in that particular chat. Anyone not in one of these chats and not in SUDO_USERS cannot use the bot. Someone in one of the chats in this list can use the bot only in that chat, not elsewhere. Can be an empty list, if SUDO_USERS is not empty.
* `DOWNLOAD_NOTIFY_TARGET`: The fields here are used to notify an external web server once a download is complete. See the [section below](#Notifying-an-external-webserver-on-download-completion) for details.
   * `enabled`: Set this to `true` to enable this feature.
   * `host`: The address of the web server to notify.
   * `port`: The server port ¯\\\_(ツ)\_/¯
   * `path`: The server path ¯\\\_(ツ)\_/¯

### Starting after installation

After the initial installation, use these instructions to (re)start the bot.

1. Start aria2 by running `./aria.sh`
2. Just start the bot with `npm start`

### Notifying an external webserver on download completion

This bot can make an HTTP request to an external web server once a download is complete. This can be when a download fails to start, fails to download, is cancelled, or completes successfully. See the section [on constants](#Constants-description) for details on how to configure it.

Your web server should listen for a POST request containing the following JSON data:

```
{
    'successful': Boolean,
    'file': {
        'name': String,
        'driveURL': String,
        'size': String
    },
    originGroup: Number
}
```

* `successful`: `true` if the download completed successfully, `false` otherwise
* `file`: Details about the file.
   * `name`: The name of the file. Might or might not be present if `successful` is `false`.
   * `driveURL`: The Google Drive download link to the downloaded file. Might or might not be present if `successful` is `false`.
   * `size`: A human-readable file size. Might or might not be present if `successful` is `false`.
* `originGroup`:  The Telegram chat ID for the chat the download was started in

If `successful` is false, any or all of the fields of `file` might be absent. However, if present, they are correct/reliable.

### License
The MIT License (MIT)

Copyright © 2019 Amit Pandey
