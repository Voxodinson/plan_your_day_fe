import Swal from "sweetalert2";

const Success = (title: string): void => {
    Swal.fire({
        toast: true,
        position: 'bottom-right',
        title: title,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        width: '500px',
        customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
        }
    });
}

export default Success;