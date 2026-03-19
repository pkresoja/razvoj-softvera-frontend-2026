import Swal from "sweetalert2";

export class Alerts {
    static error(text: string) {
        Swal.fire({
            icon: 'error',
            text
        })
    }
}