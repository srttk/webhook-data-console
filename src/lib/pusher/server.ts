import Pusher from 'pusher'


const { app_id, NEXT_PUBLIC_key, secret, cluster } = process.env


const pusher = new Pusher({
    appId: app_id,
    key: NEXT_PUBLIC_key,
    secret,
    cluster,
    useTLS: true
});


export function trigger(event_id: string = '_', data: any = { test: "Hello" }) {

    pusher.trigger('my-channel', `push-data-${event_id}`, data)
}