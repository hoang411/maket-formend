import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export const useToastStore = defineStore('toast', () => {
    const toast = useToast();

    function showSuccess(message: string) {
        toast.success(message, {
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    function showError(message: string) {
        toast.error(message, {
            timeout: 5000,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    function showInfo(message: string) {
        toast.info(message, {
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    function showWarning(message: string) {
        toast.warning(message, {
            timeout: 4000,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning
    };
});