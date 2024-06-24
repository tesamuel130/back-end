import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp (signUpDto): Promise<{ token: string }> {
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
}
