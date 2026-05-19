import { Schema, model, type InferSchemaType } from 'mongoose';

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

personSchema.index({ name: 1 });

export type PersonDocument = InferSchemaType<typeof personSchema> & {
  _id: Schema.Types.ObjectId;
};

export const Person = model('Person', personSchema);
