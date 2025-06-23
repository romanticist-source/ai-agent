import { mastra } from '../src/mastra/index';

async function demonstrateMultiAgentSystem() {
  console.log('🚀 Multi-Agent System Demonstration');
  console.log('==================================\n');
  
  try {
    // Get the master agent
    const masterAgent = (mastra as any).agents.masterAgent;
    
    // Example 1: Complex task that requires multiple agents
    console.log('📋 Example 1: Complex Data Processing Task');
    console.log('Task: Create a weather report, save it to file, and send notification\n');
    
    const complexTask = `
      I need you to:
      1. Get the current weather for Tokyo, Japan
      2. Process this data into a structured JSON format
      3. Save the processed weather report to a file called 'tokyo-weather-report.json'
      4. Send a log notification about the completion of this task
      
      Please coordinate with the appropriate specialized agents to complete this multi-step task.
    `;
    
    const result1 = await masterAgent.generate(complexTask);
    console.log('Master Agent Response:');
    console.log(result1.text);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Example 2: File operations with data processing
    console.log('📁 Example 2: File Processing Task');
    console.log('Task: Create test data file and process it\n');
    
    const fileTask = `
      Please help me:
      1. Create a JSON file with sample user data (at least 3 users with name, email, age)
      2. Read that file back and sort the users by age
      3. Save the sorted data to a new file
      4. Send a notification when everything is complete
      
      Coordinate with the file-manager and data-processor agents as needed.
    `;
    
    const result2 = await masterAgent.generate(fileTask);
    console.log('Master Agent Response:');
    console.log(result2.text);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Example 3: Direct agent communication
    console.log('🔄 Example 3: Direct Agent-to-Agent Communication');
    console.log('Testing individual agents calling each other\n');
    
    const dataAgent = (mastra as any).agents.dataProcessorAgent;
    const dataResult = await dataAgent.generate(`
      Create sample JSON data with 3 users and process it by sorting by age.
      Then ask the communication agent to send a log notification about this data processing.
    `);
    
    console.log('Data Processor Agent Response:');
    console.log(dataResult.text);
    console.log('\n' + '='.repeat(50) + '\n');
    
    console.log('💡 For MCP file operations demo, run: npx tsx examples/mcp-example.ts');
    
  } catch (error) {
    console.error('❌ Error during demonstration:', error);
  }
}

// Run the demonstration
demonstrateMultiAgentSystem().then(() => {
  console.log('\n✅ Multi-Agent System Demonstration Complete!');
}).catch(console.error);