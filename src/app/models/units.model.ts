export interface units {
  filter(arg0: (item: any) => boolean);
  units?: UnitsEntity[] | null;
}
export interface UnitsEntity {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: string;
  cost?: Cost | null;
  build_time?: number | null;
  reload_time?: number | null;
  attack_delay?: number | null;
  movement_rate?: number | null;
  line_of_sight: number;
  hit_points: number;
  range?: number | string;
  attack?: number | null;
  armor: string;
  attack_bonus?: string[] | null;
  accuracy?: string | null;
  search_radius?: number | null;
  blast_radius?: number | null;
  armor_bonus?: string[] | null;
}
export interface Cost {
  Wood?: number | null;
  Gold?: number | null;
  Food?: number | null;
}

export interface queryParameter {
  id: number;
}
