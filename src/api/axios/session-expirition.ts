export const displaySessionExpiredModal = () => {
    const modal = document.createElement('div');
    modal.classList.add(
      'fixed',
      'top-1/2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'p-5',
      'shadow-lg',
      'z-50',
      'text-center',
      'rounded-lg',
      'min-w-[250px]',
      'dark:bg-gray-800', // Dark mode background
      'bg-white', // Light mode background
      'dark:text-white', // Dark mode text
      'text-black' // Light mode text
    );
  
    modal.innerHTML = `
      <h2 class="mb-2">Session Expired</h2>
      <p class="mb-4">Your session has expired. Please log in again to continue.</p>
      <button id="modal-close-btn" class="px-4 py-2  text-white rounded bg-primary">
        OK
      </button>
    `;
  
    // Make sure the modal is added to the body
    document.body.appendChild(modal);
  
    // Ensure the modal is visible
    if (modal.style.display === 'none') {
      modal.style.display = 'block';
    }
  
    // Close modal when the button is clicked
    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
      modal.remove();
      window.location.href = '/sign-in';
    });
  };