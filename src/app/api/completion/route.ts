import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.5,
    max_tokens: 4000,
    prompt: `[content:${prompt}] and your answer is :`,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
