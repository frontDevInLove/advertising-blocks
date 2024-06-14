import "./style.module.scss";
import { AdData, TizerService } from "./servises/tizer.service";
import Card from "./components/card/card.ts";
import Slider from "./components/slider/slider.ts";

interface GnezdoConfig {
  tizerId: number;
  containerId: string;
}

export class Gnezdo {
  private tizerService = TizerService.getInstance();

  public async create(config: GnezdoConfig): Promise<void> {
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(`Container with id ${config.containerId} not found.`);
      return;
    }

    const data = await this.tizerService.fetchData(config.tizerId);

    const slider = new Slider();

    data.arr.forEach((ad: AdData) => {
      const card = new Card(ad);
      slider.appendChild(card);
    });

    container.appendChild(slider);
  }
}
