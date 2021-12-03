import { model, Schema } from "mongoose";
import { IBus } from "./IBus";
import { BusType } from "./types/BusType";
import { BusSeating } from "./types/BusSeating";

const busSchema = new Schema<IBus>({
  companyId: {
    type: "string",
    required: true,
  },
  to: {
    type: "string",
    required: true,
  },
  from: {
    type: "string",
    required: true,
  },
  busType: {
    type: "number",
    required: true,
    enum: [BusType.AC, BusType.NON_AC],
  },
  seatingArrangement: {
    type: "number",
    required: true,
    enum: [BusSeating.SITTING, BusSeating.MIXED, BusSeating.SLEEPER],
  },
  timings: {
    type: [Date],
    required: true,
  },
  fare: {
    type: "string",
    required: true,
  },
});

export default busSchema;