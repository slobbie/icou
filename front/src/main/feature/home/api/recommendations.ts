
export const chatGPT = async (messages: any, parameters = {}): Promise<any> => {
  const apikey = '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';
  if (messages[0].constructor === String) {return await chatGPT([['user', messages]])}
  messages = messages.map((line: any) => ({ role: line[0], content: line[1].trim() }))
  console.log('messages', messages)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apikey}` },
    body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, ...parameters }),
  });
  const data = await response.json();
  if (data?.error?.message) { throw new Error(data.error.message)}
  return data;
}
