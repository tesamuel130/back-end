import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [

    MongooseModule.forFeature([{}])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
