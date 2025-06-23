import { MCPClient } from "@mastra/mcp";

export const mcp = new MCPClient({
  servers: {
    // ファイルシステムMCPサーバー - ファイル操作ツールを提供
    filesystem: {
      command: "npx",
      args: [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        process.cwd()
      ]
    },
  }
});
