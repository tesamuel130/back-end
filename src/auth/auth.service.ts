import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { logInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp (signUpDto: SignUpDto): Promise<{ token: string }> {
        const {name, email, password} = signUpDto

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name, 
            email,
            password: hashPassword
        })

        const token = this.jwtService.sign({ id: user._id })

        return {token}
    }

    async login(logInDto: logInDto): Promise<{token: string}>{
        const {email, password} = logInDto

        const user = await this.userModel.findOne({email})

        if(!user){
            throw new UnauthorizedException("Invalid email or password")
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({ id: user._id })

        return {token}
    }
}
