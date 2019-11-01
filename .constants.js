module.exports = Object.freeze({
  TOKEN: '1036025488:AAGSZqUYZlVpfTWhIsOqBBDI7dLI12qrNYQ',
  ARIA_SECRET: 'amitpandey123121',
  ARIA_DOWNLOAD_LOCATION: '/app/dn',
  ARIA_DOWNLOAD_LOCATION_ROOT: '/', //The mountpoint that contains ARIA_DOWNLOAD_LOCATION
  ARIA_FILTERED_DOMAINS: ['yts', 'YTS', 'cruzing.xyz', 'eztv.ag', 'YIFY'], // Prevent downloading from URLs containing these substrings
  ARIA_FILTERED_FILENAMES: ['YIFY'], // Files/top level directories with these substrings in the filename won't be downloaded
  GDRIVE_PARENT_DIR_ID: '1GJGcH16p94FDe8E7gzkTc6zrI0H8SRg2',
  SUDO_USERS: [464848593, 401643149],	// Telegram user IDs. These users can use the bot in any chat.
  AUTHORIZED_CHATS: [-329690821],	// Telegram chat IDs. Anyone in these chats can use the bot.
  DOWNLOAD_NOTIFY_TARGET: {  // Information about the web service to notify on download completion.
    enabled: false,   // Set this to true to use the notify functionality
    host: 'hostname.domain',
    port: 80,
    path: '/botNotify'
  } 
});
