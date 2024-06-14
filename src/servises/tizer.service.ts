export interface AdData {
  inn: string;
  url: string;
  site: string;
  track_view?: string[];
  img: string;
  erid: string;
  official_name: string;
  show_info: number;
  text?: string;
  id: number;
  title: string;
}

interface FetchResponse {
  view_token: string;
  weborama_cm: number;
  dheight: number;
  css: string;
  img_client_size: number;
  cnt: number;
  gw: any;
  arr: AdData[];
  custom: number;
  rv_domain: string;
  text_img: string;
  pt: string;
  ch_c: number;
  vertical: number;
  gh: number;
  gcid: any;
  show_favicon: number;
  rtb_cm_list: string[];
  guid: any;
  image_size: string;
  format: string;
  pl: string;
  sticky: number;
  image_domain: string;
  show_partner: number;
  rvk: number;
  direction: string;
  table_rows: number;
  enable_webp: number;
  tt: string;
  native_modal: number;
  abtest: string;
  show_anons: number;
  uid: string;
  rtb_banner: number;
}

export class TizerService {
  private static instance: TizerService;

  private constructor() {}

  public static getInstance(): TizerService {
    if (!TizerService.instance) {
      TizerService.instance = new TizerService();
    }
    return TizerService.instance;
  }

  public async fetchData(tizerId: number): Promise<FetchResponse> {
    const url = `https://fcgi5.gnezdo.ru/cgi-bin/tzr.fcgi?id=${tizerId}&f=2`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data: FetchResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  }
}
