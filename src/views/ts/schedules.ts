let schedules = [];

function getUserIdAndConferenceId(url) {
  // Create a URL object
  const urlObj = new URL(url);

  // Get the pathname (e.g., "/user/schedule/1/1")
  const pathSegments = urlObj.pathname.split('/');

  // Extract the last two segments and parse them as numbers
  return pathSegments.slice(-2).map(Number);
}

async function fetchSchedules() {
  try {
    const response = await fetch('/user/api/schedule/1/1');
    schedules = await response.json();

    // Populate the dropdown
    const dropdown = document.getElementById('scheduleDropdown');
    schedules.forEach((schedule) => {
      const option = document.createElement('option');
      option.value = schedule.id;
      option.textContent = `Schedule ${schedule.id} - Created on ${schedule.created}`;
      dropdown.appendChild(option);
    });

    // Render the first schedule by default
    renderTimeslots();
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
}

function renderTimeslots() {
  const selectedId = (
    document.getElementById('scheduleDropdown') as HTMLSelectElement
  ).value;
  const schedule = schedules.find((s) => s.id === parseInt(selectedId));
  const tableBody = document.getElementById('timeslotTableBody');

  // Clear existing rows
  tableBody.innerHTML = '';

  // Render rows for the selected schedule's timeslots
  schedule.schedule.schedule.forEach((day) => {
    day.timeslots.forEach((timeslot) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${day.date}</td>
        <td class="border border-gray-300 px-4 py-2">${timeslot.id}</td>
        <td class="border border-gray-300 px-4 py-2">
          ${timeslot.presentations
            .map(
              (presentation) =>
                `<div><strong>${presentation.name}</strong> - ${presentation.topic}</div>`,
            )
            .join('')}
        </td>
      `;
      tableBody.appendChild(row);
    });
  });
}

// Fetch schedules on page load
document.addEventListener('DOMContentLoaded', fetchSchedules);
document
  .getElementById('generateSchedule')
  .addEventListener('click', async () => {
    try {
      const [userId, conferenceId] = getUserIdAndConferenceId(
        window.location.pathname,
      );

      await fetch(`/user/schedule/${userId}/${conferenceId}`, {
        method: 'post',
      });

      alert('Started generating schedule!');
    } catch (e) {
      console.error('Something went wrong!', e);
    }
  });
