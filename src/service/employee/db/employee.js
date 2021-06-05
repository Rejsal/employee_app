import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Employee extends Model {
  static table = 'employee';
 
  @field('eid') eid
  @field('name') name
  @field('username') username
  @field('profile_image') profile_image
  @field('email') email
  @field('address') address
  @field('phone') phone
  @field('website') website
  @field('company') company
}