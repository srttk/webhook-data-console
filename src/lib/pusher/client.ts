import Pusher from 'pusher-js'


export const Client = new Pusher(process.env.NEXT_PUBLIC_key || "", {
    cluster: "mt1",
});


