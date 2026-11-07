export interface DepartmentSection {
  heading: string;
  content: string;
  scripture?: string;
  items?: string[];
}

export interface Department {
  title: string;
  description: string;
  imageVertical: string;
  imageHorizontal: string;
  sections: DepartmentSection[];
}

export type DepartmentSlug =
  | "mayordomia"
  | "diaconos"
  | "conquistadores"
  | "ministerios-personales"
  | "comunicaciones"
  | "escuela-sabatica"
  | "jovenes"
  | "universitarios"
  | "educacion"
  | "familia"
  | "salud"
  | "dorcas"
  | "tesoreria"