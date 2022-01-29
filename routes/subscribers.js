import express from "express";
const router = express.Router()
import { Subscriber } from '../models/subscribers'

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber === null) {
      return res.status(404).json({ message: 'Subscriber not found'})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.messege })
  }

  res.subscriber = subscriber
  next()
}


// GetSubscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (error) {
    res.status(500).json({ messege: error.messege })
  }
})
// GetSubscriber
router.get('/:id', getSubscriber, (req, res) => {
  res.send(res.subscriber)
})
// PostSubscriber
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (error) {
    res.status(400).json({ messege: "Bad Request", errors: error.errors })
  }
})
// PatchSubscriber
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
})
// DeleteSubscribe
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Subscriber deleted' })
  } catch (error) {
    req.status(500).json({ erorr: error.messege })
  }
})

export { router as subscribersRouter }
