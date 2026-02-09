export enum BuildingType 
{
  City = 0,
  Port = 1,
  Farm = 2,
  Workshop = 3
};

export type Building =
{
    type: BuildingType;
    OwnerId: number;
}