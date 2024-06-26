import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: any) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: any) {
    try {
      const newUser = await this.authService.registerUser(signUpDto);
      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      return { message: 'Failed to register user', error: error.message };
    }
  }
}
