import { Authenticate } from 'BOID-model';
import { setupNavigation } from './navigation';
import { setupEvents } from './event';

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

document.addEventListener('DOMContentLoaded', function () {
  // Get the current path from the URL
  const path = window.location.pathname;

  // Remove 'focus' style from all nav links initially
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.remove('text-blue-500'); // Remove any existing focus style
    link.classList.add('text-gray-600'); // Set default style
  });

  // Set 'focus' style based on current path
  if (path === '/presentation') {
    document
      .getElementById('presentationNavButton')
      .classList.add('text-blue-500');
    document
      .getElementById('presentationNavButton')
      .classList.remove('text-gray-600');
  } else if (path.startsWith('/event')) {
    document.getElementById('likingNavButton').classList.add('text-blue-500');
    document
      .getElementById('likingNavButton')
      .classList.remove('text-gray-600');
  }
});
