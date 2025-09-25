export default [
  {
    model: 'GPT',
    icon: '/gpt.png',
    premium: false,
    enable: true,
    subModel: [
      { name: 'gpt 3.5', premium: false, id: "" },
      { name: 'gpt 3.5 turbo', premium: true, id: "" },
      { name: 'gpt 4.1 mini', premium: true, id: "" },
      { name: 'gpt 4.1', premium: true, id: "" },
      { name: 'gpt 5 nano', premium: true, id: "" },
      { name: 'gpt 5 mini', premium: true, id: "" },
      { name: 'gpt 5', premium: true, id: "" },
    ],
  },
  {
    model: 'Gemini',
    icon: '/gemini.png',
    premium: false,
    enable: true,
    subModel: [
      { name: 'Gemini 2.5 Pro', premium: true, id: "" },
      { name: 'Gemini 2.5 flash', premium: true, id: "" },
      { name: 'Gemini 2.5 flash lite', premium: false, id: "" },
      { name: 'Gemini live 2.5 flash preview', premium: false, id: "" },
      { name: 'Gemini 2.0 flash', premium: false, id: "" },
    ],
  },
  {
    model: 'DeepSeek',
    icon: '/deepseek.png',
    premium: true,
    enable: true,
    subModel: [
      { name: 'DeepSeek R1 0528', premium: true, id: "" },
      { name: 'DeepSeek R1', premium: true, id: "" },
    ],
  },
  {
    model: 'Mistral',
    icon: '/mistral.png',
    premium: true,
    enable: true,
    subModel: [
      { name: 'mistral medium 2505', premium: true, id: "" },
      { name: 'Mistral 3B', premium: false, id: "" },
    ],
  },
  {
    model: 'Grok',
    icon: '/grok.png',
    premium: true,
    enable: true,
    subModel: [
      { name: 'grok 3', premium: true, id: "" },
      { name: 'grok 3 mini', premium: false, id: "" },
    ],
  },
  {
    model: 'Cohere',
    icon: '/cohere.png',
    premium: true,
    enable: true,
    subModel: [
      { name: 'cohere command a', premium: false, id: "" },
      { name: 'cohere command r 08 2024', premium: true, id: "" },
    ],
  },
  {
    model: 'Llama',
    icon: '/llama.png',
    premium: true,
    enable: true,
    subModel: [
      { name: 'Llama 4 Scout 17B 16E Instruct', premium: true, id: "" },
      { name: 'Llama 3.3 70B Instruct', premium: true, id: "" },
    ],
  },
];
