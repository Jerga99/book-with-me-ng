import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'brands'
})
export class Rental extends JsonApiModel {

  @Attribute()
  id: string;

  @Attribute()
  title: string;

  @Attribute()
  city: string;

  @Attribute()
  street: string;

  @Attribute()
  category: string;

  @Attribute()
  image: string;

  @Attribute()
  bedrooms: number;

  @Attribute()
  description: string;

  @Attribute()
  daily_rate: number;

  @Attribute()
  created_at: string;
}
