import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { RsvpDto } from './dto/rsvp.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Post(':id/rsvp')
  @UseGuards(AuthGuard())
  async rsvp(@Param('id') id: string, @Body() rsvpDto: RsvpDto) {
    return this.eventsService.rsvp(id, rsvpDto);
  }
}
