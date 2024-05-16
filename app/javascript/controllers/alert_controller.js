import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"

// Connects to data-controller="alert"
export default class extends Controller {
  static values = {
  }

  initSweetalert(event) {
    console.log("SweetAlert triggered");
    event.preventDefault();

    Swal.fire({
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: `<i class="fa fa-thumbs-up"></i>`,
      confirmButtonColor: "#FFD952",
      showCancelButton: true,
      cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
      customClass: {
        popup: 'custom-swal-popup',
        header: 'custom-swal-header',
        title: 'custom-swal-title',
        icon: 'custom-swal-icon',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button'
      }
    }).then((action) => {
      if (action.isConfirmed) {
        const link = event.target.closest('a');
        if (link) {
          window.location.href = link.href;
        }
      }
    }).catch((error) => {
      console.error("Error:", error);
      event.preventDefault();
    })
  }

r  deleteSweetalert(event) {
    console.log("SweetAlert triggered");
    event.preventDefault();

    Swal.fire({
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: `<i class="fa fa-thumbs-up"></i>`,
      confirmButtonColor: "#FFD952",
      showCancelButton: true,
      cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
      customClass: {
        popup: 'custom-swal-popup',
        header: 'custom-swal-header',
        title: 'custom-swal-title',
        icon: 'custom-swal-icon',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button'
      }
    }).then((action) => {
      if (action.isConfirmed) {
        const link = event.target.closest('a');
        if (link) {
          fetch(link.href, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          })
          .then(response => {
            if (response.ok) {
              window.location.href = "/journeys"; // Redirect to the main page
            } else {
              console.error('Failed to delete');
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        }
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  }

  copySweetalert(event) {
    console.log("SweetAlert triggered");
    event.preventDefault();

    Swal.fire({
      title: "COOL!",
      text: "You can share your video now!",
      icon: "success",
      confirmButtonColor: "#FFD952",
    });
  }
}
