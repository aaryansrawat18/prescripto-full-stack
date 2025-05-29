import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    predictionType: {
      type: String,
      required: true,
      enum: ['heart', 'diabetes', 'parkinsons', 'mental-health'],
    },
    result: {
      prediction: Boolean,
      probability: String,
      risk_factors: [
        {
          name: String,
          value: String,
          impact: String,
        },
      ],
      recommendations: [String],
    },
    formData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;
