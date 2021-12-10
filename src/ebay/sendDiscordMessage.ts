import { Client, Intents } from 'discord.js';
import { token } from './config.json';

export async function sendDiscordMessage(messageContent: string, imageUrl?: string): Promise<any> {
  try {
    const client = new Client({
      ws: { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] },
    });

    await client.login(token);
    const user = await client.users.fetch('106615799774466048');
    if (imageUrl) {
      await user!.send({ files: [imageUrl] });
    }
    await user!.send(messageContent);
    client.destroy();
    return;
  } catch (err: any) {
    console.log(err);
  }
  // console.log({ user });
}
