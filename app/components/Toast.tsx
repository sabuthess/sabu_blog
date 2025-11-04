 import { showToast } from "nextjs-toast-notify";

export const handleToast = (status:string, message:string ) => {
    const toast = showToast.[status]({message}, {
        duration: 5000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
        sound: true,
     })

      return toast
}
