import { Request, Response } from "express";
import { ResourceService } from "../services/resouce.service";

const resourceService = new ResourceService();

export class ResourceController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, detail } = req.body;
      const data = await resourceService.createResource(name, detail);
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to create resource with error: ${error}` });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await resourceService.getAllResources();
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to retrieve resources with error: ${error}` });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await resourceService.getResourceById(parseInt(id));
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to retrieve resource with error: ${error}` });
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, detail } = req.body;
      const data = await resourceService.updateResourceById(
        parseInt(id),
        name,
        detail
      );
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to update resource with error: ${error}` });
    }
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await resourceService.deleteResource(parseInt(id));
      if (data) {
        res.status(204).json(`Resource with id ${id} has been deleted`);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to delete resource with error: ${error}` });
    }
  }
}
