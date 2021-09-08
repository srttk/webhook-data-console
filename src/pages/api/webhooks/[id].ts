import { NextApiRequest, NextApiResponse } from 'next'
import { trigger } from '@lib/pusher/server'

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id = "" } = req.query



    if (req.body) {
        trigger(String(id), req.body)

    }


    res.status(200).json({ message: `${id} success ` })

}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '200kb',
        },
    },
}