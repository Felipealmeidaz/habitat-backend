// Importa a biblioteca do Pusher, necessária para o backend
const Pusher = require('pusher');

// Configuração do Pusher com as suas chaves
const pusher = new Pusher({
  appId: "2011213",
  key: "5da5ccfefec60617c0cd",
  secret: "f9a067cc08a91b18c8f9",
  cluster: "us2",
  useTLS: true
});

// Esta é a função principal que a Vercel irá executar sempre que a sua URL for chamada.
export default async function handler(request, response) {
  // Estas linhas são importantes para permitir que o seu aplicativo React (o frontend)
  // possa comunicar com este backend de forma segura.
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // O navegador envia um pedido 'OPTIONS' antes do pedido 'POST' real.
  // Esta parte do código simplesmente responde que está tudo bem.
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Pega nos dados da mensagem (o texto, nome do remetente, etc.)
  // que o frontend enviou.
  const message = request.body;

  // Usa o Pusher para enviar a mensagem para todas as outras pessoas
  // que estiverem com o chat aberto.
  await pusher.trigger("habitat-channel", "new-message", message);

  // Responde ao seu aplicativo que a mensagem foi enviada com sucesso.
  response.status(200).json({ status: 'Mensagem enviada com sucesso' });
}
