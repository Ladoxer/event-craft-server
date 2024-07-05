import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Event extends Document {
  @Prop({ default: uuidv4})
  id: string;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  date: string;

  @Prop({required: true})
  organizer: string;

  @Prop([String])
  attendees: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);