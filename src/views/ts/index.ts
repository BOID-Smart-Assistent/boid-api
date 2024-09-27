import { Authenticate } from 'BOID-model';

async function Boot() {
  console.log('Booting websocket connection!');
  const socket = new WebSocket('ws://localhost:8081');
  const id = window.crypto.randomUUID();

  socket.addEventListener('open', () => {
    console.log('Connected to websocket server!');

    const payload = Authenticate.create({ id });

    socket.send(
      JSON.stringify({
        event: 'authenticate',
        data: Array.from(Authenticate.encode(payload).finish()),
      }),
    );

    console.log(`Authentivated with id ${id}`);
  });

  socket.addEventListener('error', (ev) => {
    console.error(ev);
  });
}

Boot();
