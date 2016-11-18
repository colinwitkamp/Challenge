import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  name: { type: 'String', required: true },
  amount: { type: 'Number', required: true },
  maximumRides: { type: 'Number', required: true }
});

// Convert to an Object
OfferSchema.set('toJSON', {
  transform: (doc, ret) => {
    return {
      id: ret._id,
      name: ret.name,
      amount: ret.amount,
      maximumRides: ret.maximumRides
    };
  }
});

export default mongoose.model('Offer', OfferSchema);
