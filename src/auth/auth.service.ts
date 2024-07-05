import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signUpDto: SignUpDto): Promise<{token: string, id: string}> {
    const user = await this.usersService.findOne(signUpDto.email);

    if (user) {
      throw new UnauthorizedException('Email already exists');
    }

    const createdUser = await this.usersService.create(signUpDto);

    const token = this.jwtService.sign({ id: createdUser._id });

    return { token, id: createdUser._id as string };
  }

  async login(loginDto: LoginDto): Promise<{token: string, id: string}> {
    const {email, password} = loginDto;

    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, id: user._id as string };
  }
}
