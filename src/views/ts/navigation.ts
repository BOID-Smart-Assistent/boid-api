export function setupNavigation() {
  document
    .getElementById('presentationNavButton')
    .addEventListener('click', () => {
      window.location.href = '/presentation';
    });

  document.querySelectorAll('.deleteButton').forEach((button) => {
    button.addEventListener('click', function () {
      const id = this.getAttribute('data-id');

      if (!confirm('Are you sure you want to delete this presentation?')) {
        return;
      }

      fetch(`/presentation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to delete the presentation');
          }

          alert('Presentation deleted successfully.');

          this.closest('li').remove();
        })
        .catch((err) => {
          console.error(err);
          alert('An error occurred while deleting presentation');
        });
    });
  });

  document
    .getElementById('addPresentationButton')
    .addEventListener('click', function () {
      const name = (
        document.getElementById('presentationName') as HTMLInputElement
      ).value;
      const topic = (
        document.getElementById('presentationTopic') as HTMLInputElement
      ).value;

      if (!name || !topic) {
        alert('Please fill out both the name and topic fields.');
        return;
      }

      fetch('/presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, topic }),
      })
        .then(() => {
          (
            document.getElementById('presentationName') as HTMLInputElement
          ).value = '';
          (
            document.getElementById('presentationTopic') as HTMLInputElement
          ).value = '';

          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while trying to add the presentation.');
        });
    });
}

setupNavigation();
