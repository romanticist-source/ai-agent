
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { mcpWeatherAgent } from './agents/mcp-weather-agent';
import { masterAgent } from './agents/master-agent';
import { fileManagerAgent } from './agents/file-manager-agent';
import { dataProcessorAgent } from './agents/data-processor-agent';
import { communicationAgent } from './agents/communication-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { 
    weatherAgent, 
    mcpWeatherAgent,
    masterAgent,
    fileManagerAgent,
    dataProcessorAgent,
    communicationAgent,
  },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
