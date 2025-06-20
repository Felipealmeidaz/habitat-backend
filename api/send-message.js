// Arquivo: /api/send-message.js

// Importa a biblioteca do Pusher
const Pusher = require('pusher');

// Configuração do Pusher com suas chaves
const pusher = new Pusher({
  appId: "2011213",
  key: "5da5ccfefec60617c0cd",
  secret: "f9a067cc08a91b18c8f9",
  cluster: "us2",
  useTLS: true
});

// Função principal que a Vercel irá executar
export default async function handler(request, response) {
  // Configurações para permitir que seu app React chame esta função
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde ao "pre-flight request" do navegador
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Pega a mensagem do corpo da requisição
  const message = request.body;

  // Dispara o evento "new-message" no canal "habitat-channel" com os dados da mensagem
  await pusher.trigger("habitat-channel", "new-message", message);

  // Responde que tudo deu certo
  response.status(200).json({ status: 'Mensagem enviada com sucesso' });
}
