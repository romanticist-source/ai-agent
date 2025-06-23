import { mastra } from '../src/mastra/index';
import { createEnhancedFileManagerAgent } from '../src/mastra/agents/enhanced-file-manager-agent';
import { createEnhancedMasterAgent } from '../src/mastra/agents/enhanced-master-agent';

async function demonstrateMCPSystem() {
  console.log('🚀 MCP-Enhanced Multi-Agent System Demonstration');
  console.log('================================================\n');
  
  try {
    // 基本システムが動作することを確認
    console.log('✅ Basic multi-agent system loaded');
    console.log('Available basic agents:', Object.keys((mastra as any).agents || {}));
    console.log('\n' + '='.repeat(50) + '\n');
    
    // MCP対応エージェントを初期化
    console.log('🔧 Initializing MCP-enhanced agents...');
    const enhancedFileManagerAgent = await createEnhancedFileManagerAgent();
    const enhancedMasterAgent = await createEnhancedMasterAgent();
    console.log('✅ MCP agents initialized successfully');
    console.log('\n' + '='.repeat(50) + '\n');
    
    // MCP対応ファイルマネージャーのテスト
    console.log('📁 Testing Enhanced File Manager with MCP');
    
    const fileResult = await enhancedFileManagerAgent.generate(`
      Please demonstrate your MCP file capabilities by:
      1. Creating a test directory called 'mcp-demo'
      2. Creating a file 'demo.txt' with current timestamp
      3. Listing the directory contents
      4. Reading the file back to verify
      
      Show me what MCP tools you have available.
    `);
    
    console.log('Enhanced File Manager Response:');
    console.log(fileResult.text);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // MCP対応マスターエージェントのテスト
    console.log('🎯 Testing Enhanced Master Agent with MCP');
    
    const masterResult = await enhancedMasterAgent.generate(`
      Please coordinate a complex task:
      1. Use your MCP tools to create a 'reports' directory
      2. Get weather data for Tokyo using the weather agent
      3. Save the weather data to a JSON file in the reports directory
      4. Use the communication agent to log completion
      
      Demonstrate both direct MCP usage and agent coordination.
    `);
    
    console.log('Enhanced Master Agent Response:');
    console.log(masterResult.text);
    
  } catch (error) {
    console.error('❌ Error during MCP demonstration:', error);
    console.log('\n💡 This is expected if MCP server dependencies are not available.');
    console.log('The basic multi-agent system will still work without MCP.');
  }
}

// Run the demonstration
demonstrateMCPSystem().then(() => {
  console.log('\n✅ MCP Multi-Agent System Demonstration Complete!');
}).catch(console.error);