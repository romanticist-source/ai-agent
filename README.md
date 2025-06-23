# Multi-Agent Mastra Application

この Mastra アプリケーションは、複数のエージェントが連携して複雑なタスクを実行できるマルチエージェントシステムです。

## 🏗️ アーキテクチャ

### エージェント構成

#### 基本エージェント
1. **Master Coordinator Agent** (`masterAgent`)
   - 全体を統括するマスターエージェント
   - 複雑なタスクを分析して適切なサブエージェントに委譲
   - 結果を統合して最終的な回答を生成

2. **File Manager Agent** (`fileManagerAgent`)
   - ファイルシステム操作専用
   - ファイルの読み書き、作成、削除
   - ディレクトリ管理

3. **Data Processor Agent** (`dataProcessorAgent`)
   - データ処理とJSON操作専用
   - データの変換、フィルタリング、ソート
   - 構造化データの処理

4. **Communication Agent** (`communicationAgent`)
   - 通知とコミュニケーション専用
   - ログ出力、メール送信（シミュレート）
   - Slack通知、Webhook呼び出し

5. **Weather Agent** (`weatherAgent`)
   - 天気情報取得専用
   - 既存の天気ツールを使用

#### MCP対応強化エージェント
1. **Enhanced Master Agent** (`enhancedMasterAgent`)
   - MCP対応の統括エージェント
   - 直接的なファイル操作とエージェント間連携の両方が可能
   - より高度なタスク管理機能

2. **Enhanced File Manager Agent** (`enhancedFileManagerAgent`)
   - 完全なMCP統合ファイル操作エージェント
   - ファイルシステムサーバーの全機能を活用
   - 高度なファイル管理とディレクトリ操作

## 🚀 使用方法

### 開発環境での起動

```bash
# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm run dev
```

開発サーバーが起動すると以下が利用可能になります：
- **API**: http://localhost:4112/api
- **プレイグラウンド**: http://localhost:4112

### マルチエージェントシステムの使用例

#### 基本的な使用方法
```typescript
import { mastra } from './src/mastra/index';

// マスターエージェントを使用して複雑なタスクを実行
const masterAgent = mastra.agents.masterAgent;

const result = await masterAgent.generate(`
  以下のタスクを実行してください：
  1. 東京の天気情報を取得
  2. その情報をJSONファイルとして保存
  3. 作業完了の通知を送信
`);

console.log(result.text);
```

#### MCP対応強化エージェントの使用
```typescript
// MCP機能付きの強化マスターエージェントを使用
const enhancedMaster = mastra.agents.enhancedMasterAgent;

const result = await enhancedMaster.generate(`
  以下の複雑なファイル操作を実行してください：
  1. プロジェクトディレクトリにreportsフォルダを作成
  2. 現在の日時でレポートファイルを作成
  3. 天気データを取得してレポートに書き込み
  4. ファイル作成完了の通知を送信
`);

// MCP対応ファイルマネージャーで直接ファイル操作
const fileAgent = mastra.agents.enhancedFileManagerAgent;

const fileResult = await fileAgent.generate(`
  以下のファイル操作を実行してください：
  1. 'data'ディレクトリを作成
  2. その中に'sample.json'ファイルを作成
  3. JSONデータを書き込み
  4. ファイルの内容を確認
`);
```

### エージェント間の連携

各エージェントは `call_agent` ツールを使用して他のエージェントを呼び出すことができます：

```typescript
// ファイルマネージャーエージェントを直接使用
const fileAgent = mastra.agents.fileManagerAgent;

const result = await fileAgent.text(`
  'test.json' ファイルを作成し、
  データ処理エージェントに内容の処理を依頼してください
`);
```

## 🔧 主要機能

### 1. MCP (Model Context Protocol) 統合
- ファイルシステム操作のための MCP サーバー
- 標準化されたツールインターフェース

### 2. エージェント間通信
- `call_agent` ツールによる他エージェントの呼び出し
- 結果の受け渡しと処理

### 3. 専門化された機能
- 各エージェントが特定の領域に特化
- 効率的なタスク分散

### 4. メモリ機能
- 会話履歴の保持
- コンテキストの維持

## 📁 プロジェクト構造

```
src/mastra/
├── agents/
│   ├── master-agent.ts          # マスター統括エージェント
│   ├── file-manager-agent.ts    # ファイル操作エージェント
│   ├── data-processor-agent.ts  # データ処理エージェント
│   ├── communication-agent.ts   # 通信エージェント
│   └── weather-agent.ts         # 天気エージェント
├── tools/
│   └── agent-coordinator.ts     # エージェント間通信ツール
├── system/
│   └── agent-registry.ts        # エージェント管理システム
├── mcp.ts                       # MCP クライアント設定
└── index.ts                     # メイン設定ファイル
```

## 🧪 テスト

### 基本マルチエージェントシステムのテスト
```bash
# TypeScript で直接実行
npx tsx examples/multi-agent-example.ts
```

### MCP対応エージェントのテスト
```bash
# MCP機能のデモンストレーション
npx tsx examples/mcp-example.ts
```

### プレイグラウンドでのテスト
開発サーバー起動後、http://localhost:4112 でWebプレイグラウンドを使用してエージェントをテストできます。

#### MCP機能を有効にするには
プレイグラウンドまたはコードから以下のように実行：

```typescript
import { initializeMCPAgents } from './src/mastra/index';

// MCP対応エージェントを初期化
const mcpAgents = await initializeMCPAgents();

// MCP対応ファイルマネージャーを使用
const result = await mcpAgents.enhancedFileManagerAgent.generate(`
  Create a file called 'test.txt' with current timestamp
`);
```

## ⚠️ 現在の制限事項

- **エージェント間通信**: 現在のMastraバージョンでは、エージェント作成後にツールを動的に追加することができません
- **循環参照**: エージェント間の直接的な相互参照を避けるため、遅延インポートを使用しています
- **MCP初期化**: MCPツールの初期化に時間がかかる場合があります

## ✅ 解決済み

- **MCP統合**: 開発時にMCPツールを動的に初期化できるようになりました
- **ファイル操作**: MCP対応により高度なファイルシステム操作が可能
- **開発サーバー**: 安定した動作で基本エージェントシステムが利用可能
- **エージェント間連携**: call_agentツールによる他エージェント呼び出しが実装済み

## 🔮 今後の拡張

- 新しい専門エージェントの追加
- より完全なエージェント間通信システム
- 並列処理とタスクキューイング
- エラーハンドリングと復旧機能の強化
- MCP統合の完全実装

## 📝 ライセンス

ISC# ai-agent
