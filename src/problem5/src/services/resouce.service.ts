import { AppDataSource } from "../database/data-source";
import { Resource } from "../database/entities/resource.entity";

export class ResourceService {
  async createResource(name: string, detail: string): Promise<Resource> {
    const resource = new Resource();
    resource.name = name;
    resource.detail = detail;
    return await AppDataSource.manager.save(resource);
  }

  async getAllResources(): Promise<Resource[]> {
    return await AppDataSource.manager.find(Resource);
  }

  async getResourceById(id: number): Promise<Resource | null> {
    return await AppDataSource.manager.findOneBy(Resource, { id });
  }

  async updateResourceById(
    id: number,
    name: string,
    detail: string
  ): Promise<Resource | null> {
    const resource = await AppDataSource.manager.findOneBy(Resource, { id });
    if (resource) {
      resource.name = name;
      resource.detail = detail;
      return await AppDataSource.manager.save(resource);
    }
    return null;
  }

  async deleteResource(id: number): Promise<boolean> {
    const resource = await AppDataSource.manager.findOneBy(Resource, { id });
    if (resource) {
      await AppDataSource.manager.remove(resource);
      return true;
    }
    return false;
  }
}
