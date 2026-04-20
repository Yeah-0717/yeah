import { ChatMessage } from './storage';

// AI服务配置
const AI_WORKER_URL = 'https://ai-proxy.your-worker.workers.dev'; // 替换为实际的Worker URL

// 发送AI请求
export async function sendAIRequest(messages: ChatMessage[]) {
  try {
    const response = await fetch(AI_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      throw new Error(`AI请求失败: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: data.choices[0]?.message?.content || ''
    };
  } catch (error) {
    console.error('AI请求错误:', error);
    return {
      success: false,
      error: (error as Error).message
    };
  }
}

// 生成思路点拨请求
export async function getAIGuidance(projectId: string, userCode: string, userMessage: string) {
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: `项目ID: ${projectId}\n用户代码:\n\`\`\`python\n${userCode}\n\`\`\`\n用户问题: ${userMessage}`,
      timestamp: Date.now()
    }
  ];

  return sendAIRequest(messages);
}

// 生成代码纠错请求
export async function getAICodeFix(projectId: string, userCode: string, errorMessage: string) {
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: `项目ID: ${projectId}\n用户代码:\n\`\`\`python\n${userCode}\n\`\`\`\n错误信息: ${errorMessage}`,
      timestamp: Date.now()
    }
  ];

  return sendAIRequest(messages);
}
