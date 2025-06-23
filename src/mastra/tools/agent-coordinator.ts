import { z } from 'zod';

export const agentCoordinatorTool = {
  name: 'call_agent',
  description: 'Call another agent to perform a specific task. Available agents: file-manager, data-processor, communication, weather',
  parameters: z.object({
    agentName: z.enum(['file-manager', 'data-processor', 'communication', 'weather']).describe('Name of the agent to call'),
    task: z.string().describe('Task description for the agent'),
    context: z.string().optional().describe('Additional context or data for the task'),
  }),
  execute: async ({ agentName, task, context }: { agentName: string; task: string; context?: string }) => {
    try {
      // 遅延インポートで循環参照を回避
      const { callAgent } = await import('../system/agent-registry');
      const result = await callAgent(agentName, task, context);
      return result;
    } catch (error) {
      return {
        status: 'error',
        agentName,
        task,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};