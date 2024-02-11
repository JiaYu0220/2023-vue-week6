import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore('alertStore', {
  actions: {
    confirmSwal(title) {
      return Swal.fire({
        title,
        showCancelButton: true,
      });
    },
    miniSwal(title) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        title,
        icon: 'success',
      });
    },
  },
});
