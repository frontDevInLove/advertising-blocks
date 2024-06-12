import './style.module.scss';

interface GnezdoConfig {
  tizerId: number;
  containerId: string;
}

export class Gnezdo {
  create(config: GnezdoConfig): void {
    const container = document.getElementById(config.containerId);
    if (container) {
      console.log('Container is found');
    } else {
      console.error(`Container with id ${config.containerId} not found.`);
    }
  }
}