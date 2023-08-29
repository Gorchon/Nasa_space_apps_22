import mongoose, { Schema, model, Types, Model } from 'mongoose';
import { IUser } from './User';

export interface IDonation {
  author: Types.ObjectId | IUser;
  amountDonated: number;
}

export type DonationDocument = IDonation & Document;
export type DonationModel = Model<DonationDocument>;

const DonationSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'El nombre del donante es requerido'],
  },
  amountDonated: {
    type: Number,
    required: [true, 'La cantidad donada debe ser enviada'],
  },
});

export default (mongoose.models.Donation ||
  model<IDonation>('Donation', DonationSchema)) as DonationModel;
