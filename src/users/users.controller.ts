import { Controller, UseGuards, Get,Delete, ParseIntPipe, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get("me")
  async getMe(@CurrentUser() user: CurrentUserDto){
    const data = await this.usersService.findOne(user.id);
    return data
  }

  @Get('')
  @Roles('admin')
  async getAllUsers(){
    return this.usersService.findAll();
  }
}
