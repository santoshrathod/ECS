// EntityManager.js
export class EntityManager {
  constructor() {
    this.entities = new Set();
    this.components = new Map();
  }

  createEntity() {
    const id = crypto.randomUUID();
    this.entities.add(id);
    this.components.set(id, new Map());
    return id;
  }

  addComponent(entityId, component) {
    const map = this.components.get(entityId);
    map.set(component.constructor.name, component);
  }

  getComponent(entityId, componentClass) {
    return this.components.get(entityId).get(componentClass.name);
  }

  getEntitiesWith(...componentClasses) {
    return [...this.entities].filter(id => {
      const comps = this.components.get(id);
      return componentClasses.every(cls => comps.has(cls.name));
    });
  }
}
