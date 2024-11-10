// import { google } from '@ai-sdk/google';
// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// export async function GET(req: Request) {
//   try {
//     const prompt = "Create a list of three open-ended and direct comments formatted as a single string. Each comment should be separated by '||'. these comments should not be like questions they should be like complements or confessions. Give all three comments new every time i give this same prompt";

//       const result = await streamText({
//         model: google('gemini-1.5-pro-latest'),
//         prompt: prompt,
//       });

      
//      // Stream the response back to the client
//      return result.toTextStreamResponse(); // Return as a stream response

//   } catch (error) {
//       console.error('An unexpected error occurred:', error);
//       throw error;
//   }
// }


import { cohere } from '@ai-sdk/cohere';
import {generateText, streamText} from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const prompt = `Create a list of three comments formatted as a single string. Each comment should be separated by '||'. these comments should be like feedbacks or confessions and keep the messages very short if possible. The topic is  ${topic}`;

      const { text } = await generateText({
        model: cohere('command-r-plus'),
        prompt: prompt,
      });
       
      return NextResponse.json({ message: text });

  } catch (error) {
      console.error('An unexpected error occurred:', error);
      throw error;
  }
}


