import { Client, Intents } from 'discord.js';
import { token, userId } from './config.json';

export async function sendDiscordMessage(messageContent: string, imageUrl?: string): Promise<any> {
  const client = new Client({
    ws: { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] },
  });
  try {
    await client.login(token);
    const user = await client.users.fetch(userId);
    if (imageUrl) {
      await user!.send(messageContent, { files: [imageUrl] });
    } else {
      await user!.send(messageContent);
    }
    client.destroy();
  } catch (err: any) {
    console.error(err);
    client.destroy();
  }
}
