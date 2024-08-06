import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const model = openai("ft:gpt-3.5-turbo-0125:personal::9tDaRgs3");

export async function POST(req: Request) {
  const { messages } = await req.json();
  const initialMessage = {
    role: "system",
    content: `Your name is TheraBot. act as a psychotherapist. Please listen to my thoughts and
      feelings, ask open-ended questions, and offer supportive guidance. Help me explore my emotions,
      identify patterns in my behavior, and suggest coping strategies or insights to improve my mental
      well-being. Remember to be empathetic and non-judgmental.
        
      Remember: you are only a psychotherapist`,
  };

  const result = await streamText({
    model: model,
    messages: messages.concat(initialMessage),
  });

  return result.toDataStreamResponse();
}
