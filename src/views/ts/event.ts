export function setupEvents() {
  // Like button functionality
  document.querySelectorAll('.likeButton').forEach((button) => {
    button.addEventListener('click', function () {
      const presentationId = this.getAttribute('data-id');

      this.closest('li').remove();

      eventListener('0', presentationId);
    });
  });

  // Dislike button functionality
  document.querySelectorAll('.dislikeButton').forEach((button) => {
    button.addEventListener('click', function () {
      const presentationId = this.getAttribute('data-id');

      this.closest('li').remove();

      eventListener('1', presentationId);
    });
  });

  document
    .getElementById('userId')
    .addEventListener('keydown', function (event) {
      console.log('debug');
      if (event.key === 'Enter') {
        event.preventDefault();
        const userId = (this as HTMLInputElement).value.trim();
        console.log(userId);
        if (userId) {
          window.location.href = `/event/${userId}`;
        } else {
          alert('Please enter a valid ID.');
        }
      }
    });
}

function eventListener(eventType: string, presentationId: string) {
  const userId = window.location.pathname.split('/').pop();

  fetch(`/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventType,
      presentationId: +presentationId,
      userId,
    }), // 0 is like, 1 is dislike
  }).catch((error) => {
    console.error('Error:', error);
  });
}

setupEvents();
