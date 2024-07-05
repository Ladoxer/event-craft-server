import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { RsvpDto } from './dto/rsvp.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findOne({id: id}).exec();
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel({
      title: createEventDto.title,
      description: createEventDto.description,
      date: createEventDto.date,
      organizer: createEventDto.organizer,
    });
    return createdEvent.save();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const existingEvent = await this.eventModel.findOneAndUpdate(
      { id: id },
      updateEventDto,
      { new: true },
    );

    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }
    return existingEvent;
  }

  async delete(id: string): Promise<void> {
    const result = await this.eventModel.deleteOne({id: id}).exec();

    if (!result) {
      throw new NotFoundException('Event not found');
    }
  }

  async rsvp(id: string, rsvpDto: RsvpDto): Promise<Event> {
    const event = await this.eventModel.findOne({id: id}).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.attendees.push(rsvpDto.user);
    return event.save();
  }
}
