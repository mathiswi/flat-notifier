import { Telegram } from 'telegraf';
import { token, chatId } from './telegramConfig.json';


const PLACEHOLDER_IMAGE = "https://heuft.com/upload/image/400x267/no_image_placeholder.png";

export async function sendTelegramMessage(textContent?: string, imageUrl?: string) {
  const telegram: Telegram = new Telegram(token as string);
  const result = await telegram.sendPhoto(
    chatId,
    imageUrl ?? PLACEHOLDER_IMAGE
    , {
      caption: textContent ?? 'Testmessage',
      parse_mode: "Markdown"
    });
  console.log(result);
  return true;
}