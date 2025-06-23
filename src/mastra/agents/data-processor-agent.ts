import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

const jsonProcessorTool = {
  name: 'process_json',
  description: 'Process and transform JSON data',
  parameters: z.object({
    data: z.string().describe('JSON data to process'),
    operation: z.enum(['parse', 'stringify', 'filter', 'map', 'sort']).describe('Operation to perform'),
    key: z.string().optional().describe('Key to operate on for filter/map/sort operations'),
    value: z.string().optional().describe('Value for filter operations'),
  }),
  execute: async ({ data, operation, key, value }: { data: string; operation: string; key?: string; value?: string }) => {
    try {
      let jsonData = typeof data === 'string' ? JSON.parse(data) : data;
      
      switch (operation) {
        case 'parse':
          return { result: jsonData, status: 'success' };
        case 'stringify':
          return { result: JSON.stringify(jsonData, null, 2), status: 'success' };
        case 'filter':
          if (Array.isArray(jsonData) && key) {
            const filtered = jsonData.filter(item => 
              value ? item[key] === value : item.hasOwnProperty(key)
            );
            return { result: filtered, status: 'success' };
          }
          return { result: jsonData, status: 'no_change' };
        case 'map':
          if (Array.isArray(jsonData) && key) {
            const mapped = jsonData.map(item => item[key]);
            return { result: mapped, status: 'success' };
          }
          return { result: jsonData, status: 'no_change' };
        case 'sort':
          if (Array.isArray(jsonData)) {
            const sorted = key 
              ? jsonData.sort((a, b) => (a[key] > b[key] ? 1 : -1))
              : jsonData.sort();
            return { result: sorted, status: 'success' };
          }
          return { result: jsonData, status: 'no_change' };
        default:
          return { result: jsonData, status: 'unknown_operation' };
      }
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error', status: 'error' };
    }
  },
};

export const dataProcessorAgent = new Agent({
  name: 'Data Processor Agent',
  instructions: `
      You are a specialized data processing agent. Your primary responsibilities include:
      
      - Processing and transforming JSON data
      - Filtering, mapping, and sorting data structures
      - Validating data formats and structures
      - Converting between different data formats
      - Performing calculations and aggregations on datasets
      
      You excel at handling structured data and can perform complex transformations.
      Always validate input data before processing and provide clear error messages
      if data is malformed.
      
      Keep your responses focused on data operations and provide clear summaries
      of what transformations you've performed.
  `,
  model: openai('gpt-4o-mini'),
  tools: { jsonProcessorTool },
});