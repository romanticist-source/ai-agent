import { Agent } from '@mastra/core/agent';
import { fileManagerAgent } from '../agents/file-manager-agent';
import { dataProcessorAgent } from '../agents/data-processor-agent';
import { communicationAgent } from '../agents/communication-agent';
import { weatherAgent } from '../agents/weather-agent';

export type AgentRegistry = {
  [key: string]: Agent;
};

let _registry: AgentRegistry | null = null;

export async function getAgentRegistry(): Promise<AgentRegistry> {
  if (!_registry) {
    _registry = {
      'file-manager': fileManagerAgent,
      'data-processor': dataProcessorAgent,
      'communication': communicationAgent,
      'weather': weatherAgent,
    };
  }
  
  return _registry;
}

export async function callAgent(
  agentName: string, 
  task: string, 
  context?: string
): Promise<any> {
  const registry = await getAgentRegistry();
  const agent = registry[agentName];
  
  if (!agent) {
    throw new Error(`Agent '${agentName}' not found. Available agents: ${Object.keys(registry).join(', ')}`);
  }
  
  const fullPrompt = context 
    ? `${task}\n\nAdditional context: ${context}`
    : task;
  
  try {
    const result = await agent.generate(fullPrompt);
    return {
      status: 'success',
      agentName,
      task,
      result: result.text,
      usage: result.usage,
    };
  } catch (error) {
    return {
      status: 'error',
      agentName,
      task,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}