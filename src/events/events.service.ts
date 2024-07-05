import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { RsvpDto } from './dto/rsvp.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async update(id: string, updateEventDto: CreateEventDto): Promise<Event> {
    const existingEvent = await this.eventModel.findByIdAndUpdate(
      id,
      updateEventDto,
      { new: true },
    );

    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }
    return existingEvent;
  }

  async delete(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('Event not found');
    }
  }

  async rsvp(id: string, rsvpDto: RsvpDto): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.rsvps.push(rsvpDto.email);
    return event.save();
  }
}
