import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { logInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ){}

    @Post('/signup')
    signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }>{
        return this.authService.signUp(SignUpDto)
    }

    @Get('/logIn')
    logIn(@Body() loginDto: logInDto): Promise<{ token: string }>{
        return this.authService.login(loginDto)
    }
}
