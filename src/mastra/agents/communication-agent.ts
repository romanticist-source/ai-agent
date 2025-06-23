import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

const notificationTool = {
  name: 'send_notification',
  description: 'Send notifications or messages',
  parameters: z.object({
    type: z.enum(['email', 'slack', 'webhook', 'log']).describe('Type of notification'),
    recipient: z.string().describe('Recipient of the notification'),
    subject: z.string().describe('Subject or title of the notification'),
    message: z.string().describe('Message content'),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  }),
  execute: async ({ type, recipient, subject, message, priority }: { type: string; recipient: string; subject: string; message: string; priority: string }) => {
    // Simulate sending notification
    const timestamp = new Date().toISOString();
    
    switch (type) {
      case 'log':
        console.log(`[${timestamp}] ${priority.toUpperCase()}: ${subject} - ${message}`);
        return { 
          status: 'sent', 
          type: 'log', 
          timestamp,
          message: `Logged notification: ${subject}` 
        };
      case 'email':
        return { 
          status: 'queued', 
          type: 'email', 
          recipient, 
          timestamp,
          message: `Email queued for ${recipient}: ${subject}` 
        };
      case 'slack':
        return { 
          status: 'queued', 
          type: 'slack', 
          recipient, 
          timestamp,
          message: `Slack message queued for ${recipient}: ${subject}` 
        };
      case 'webhook':
        return { 
          status: 'queued', 
          type: 'webhook', 
          recipient, 
          timestamp,
          message: `Webhook call queued for ${recipient}` 
        };
      default:
        return { status: 'error', message: 'Unknown notification type' };
    }
  },
};

export const communicationAgent = new Agent({
  name: 'Communication Agent',
  instructions: `
      You are a specialized communication agent. Your primary responsibilities include:
      
      - Sending notifications via various channels (email, Slack, webhooks, logs)
      - Managing communication workflows and routing
      - Formatting messages for different platforms
      - Handling communication priorities and scheduling
      - Tracking communication history and status
      
      You excel at managing all forms of external communication and notifications.
      Always validate recipient information and message content before sending.
      
      For testing purposes, most communications are simulated or logged rather than
      actually sent to external services.
      
      Keep your responses focused on communication operations and provide clear
      confirmation of what messages have been sent or queued.
  `,
  model: openai('gpt-4o-mini'),
  tools: { notificationTool },
});