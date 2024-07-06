import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import * as https from 'https';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor() {
    this.schedulePingServer();
  }

  private schedulePingServer() {
    cron.schedule('*/14 * * * * *', () => {
      this.pingServer();
    })
  }

  private pingServer() {
    this.logger.log('pinging server to keep it alive');

    const options = {
      hostname: 'feeton.onrender.com',
      method: 'GET',
      timeout: 60000,
    };

    const req = https.request(options, (res) => {
      this.logger.log(`Ping response: ${res.statusCode}`);
    });

    req.on('timeout', () => {
      req.destroy();
      this.logger.error('Ping request timed out');
    });

    req.on('error', (error) => {
      this.logger.error(`Ping request error: ${error.message}`);
    });

    req.end();
  }
}
