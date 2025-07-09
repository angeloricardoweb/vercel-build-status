import mongoose, { Schema, Document } from 'mongoose';

export interface IBuildEvent extends Document {
  eventId: string;
  type: string;
  createdAt: Date;
  payload: Record<string, unknown>;
  region: string;
  projectId?: string;
  deploymentId?: string;
  status?: string;
  url?: string;
  meta?: {
    teamId?: string;
    userId?: string;
    projectName?: string;
    deploymentUrl?: string;
    target?: string;
    alias?: string[];
    framework?: string;
    attackType?: string;
    mitigated?: boolean;
    ipAddress?: string;
    userAgent?: string;
  };
  expiresAt?: Date;
}

const BuildEventSchema: Schema = new Schema({
  eventId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  payload: { type: Schema.Types.Mixed, required: true },
  region: { type: String, required: true },
  projectId: { type: String },
  deploymentId: { type: String },
  status: { type: String },
  url: { type: String },
  meta: {
    teamId: { type: String },
    userId: { type: String },
    projectName: { type: String },
    deploymentUrl: { type: String },
    target: { type: String },
    alias: [{ type: String }],
    framework: { type: String },
    attackType: { type: String },
    mitigated: { type: Boolean },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  expiresAt: { type: Date, required: true, default: function() {
    // Expira em 25 horas (90000 segundos)
    return new Date(Date.now() + 25 * 60 * 60 * 1000);
  }},
}, {
  timestamps: true,
});

// Índices para melhor performance
BuildEventSchema.index({ type: 1 });
BuildEventSchema.index({ createdAt: -1 });
BuildEventSchema.index({ projectId: 1 });
BuildEventSchema.index({ deploymentId: 1 });
BuildEventSchema.index({ status: 1 });
BuildEventSchema.index({ 'meta.teamId': 1 });

// TTL Index para expiração automática após 25 horas
BuildEventSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.BuildEvent || mongoose.model<IBuildEvent>('BuildEvent', BuildEventSchema); 