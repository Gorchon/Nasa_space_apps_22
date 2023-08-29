import mongoose, { Schema, model, Types, Model } from 'mongoose';
import { IUser } from './User';

export interface IPeerReview {
  author: Types.ObjectId | IUser;
  feedback: string;
  trustWorthy: boolean;
  amountBet: number;
  didWin?: boolean | null;
}

export type PeerReviewDocument = IPeerReview & Document;
export type PeerReviewModel = Model<PeerReviewDocument>;

const PeerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El autor de la review debe existir'],
  },
  feedback: {
    type: String,
    required: [true, 'El Feedback de la review debe ser entregado'],
  },
  trustWorthy: {
    type: Boolean,
    required: [true, 'La veracidad del articulo debe ser entregada'],
  },
  amountBet: {
    type: String,
    required: [true, 'La cantidad de la review debe ser enviado'],
  },
  didWin: {
    type: Boolean,
    default: null,
  },
});

export default (mongoose.models.PeerReview ||
  model<IPeerReview>('PeerReview', PeerSchema)) as PeerReviewModel;
