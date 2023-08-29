import mongoose, { Model, model, Schema, Types } from 'mongoose';
import type { IDonation } from './Donation';
import type { IPeerReview } from './PeerReview';
import { IUser } from './User';

export interface IPaper {
  author: Types.ObjectId | IUser;
  title: string;
  description: string;
  didPublish: boolean;
  filePath?: string;
  peerReviews?: IPeerReview[];
  donations: IDonation[] | Types.ObjectId[];
  trialStartedAt?: Date;
}

export type PaperDocument = IPaper & Document;
export type PaperModel = Model<PaperDocument>;

const PaperSchema = new Schema<IPaper>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El autor de la review debe existir'],
  },
  title: {
    type: String,
    required: [true, 'El Titulo de la review debe ser entregado'],
  },
  description: {
    type: String,
    required: false,
  },
  didPublish: {
    type: Boolean,
    default: false,
  },
  filePath: {
    type: String,
    default: '',
  },
  peerReviews: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PeerReview',
      },
    ],
    default: [],
  },
  donations: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donation',
      },
    ],
    default: [],
  },
  trialStartedAt: {
    type: Date,
    required: false,
  },
});

export default (mongoose.models.Paper ||
  model<IPaper>('Paper', PaperSchema)) as PaperModel;
