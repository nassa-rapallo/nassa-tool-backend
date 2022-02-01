import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RuleService } from 'src/services/clients/rule/rule.service';

import * as Dto from 'src/modules/rule/dto';
import * as Responses from 'src/modules/rule/responses';

@UseInterceptors(ResponseInterceptor)
@Controller('permission/rules')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get('/')
  @ApiOperation({ description: 'Get all current groups' })
  @ApiResponse({ type: Responses.GetAll })
  async getAllRoles(): Promise<Responses.GetAll> {
    return this.ruleService.groupGetAll();
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get role by ID' })
  @ApiBody({ type: Dto.Get })
  @ApiResponse({ type: Responses.Get })
  async getRole(@Param() param: Dto.Get): Promise<Responses.Get> {
    return this.ruleService.groupGet(param);
  }

  @Post('/')
  @ApiOperation({ description: 'Create new group' })
  @ApiBody({ type: Dto.Create })
  @ApiResponse({ type: Responses.Created })
  async createRole(@Body() data: Dto.Create): Promise<Responses.Created> {
    return this.ruleService.groupCreate(data);
  }

  @Delete('/')
  @ApiOperation({ description: 'Delete a group by ID' })
  @ApiBody({ type: Dto.Delete })
  @ApiResponse({ type: Responses.Deleted })
  async deleteRole(@Body() data: Dto.Delete): Promise<Responses.Deleted> {
    return this.ruleService.groupDelete(data);
  }

  @Put('/')
  @ApiOperation({ description: 'Update a group by ID' })
  @ApiBody({ type: Dto.Update })
  @ApiResponse({ type: Responses.Updated })
  async updateRole(@Body() data: Dto.Update): Promise<Responses.Updated> {
    return this.ruleService.groupUpdate(data);
  }
}
