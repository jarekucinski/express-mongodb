import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  }
})
const subscriberModel = mongoose.model('Subscriber', subscribersSchema)

export { subscriberModel as Subscriber }
