export const MAKES = ["Acura", "Nissan", "Toyota", "Honda", "BMW", "Mercedes"];
export const MODELS = {
  Acura: ["MDX", "RDX", "TLX", "ILX"],
  Nissan: ["Micra", "Altima", "Sentra", "Rogue", "GT-R"],
  Toyota: ["Camry", "Corolla", "RAV4", "Land Cruiser"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot"],
  BMW: ["3 Series", "5 Series", "X5", "M3"],
  Mercedes: ["C-Class", "E-Class", "S-Class", "GLE"],
};

export const CAR_IMAGES = {
  acura: require("./assets/acura.png"),
  nissan: require("./assets/nissan.png"),
  bmw: require("./assets/bmw.png"),
  mercedes: require("./assets/mercedes.png"),
  honda: require("./assets/honda.png"),
  toyota: require("./assets/toyota.png"),
  default: require("./assets/icon.png"),
};

export const SERVICE_TYPES = [
  { label: "Oil Change", value: "oil" },
  { label: "Air Filter Change", value: "airFilter" },
  { label: "Spark Plugs", value: "spark" },
  { label: "Brake Pads", value: "brake" },
  { label: "Oil Filter Change", value: "oilFilter" },
];

export const ICON_MAP = {
  oil: "water-outline",
  airFilter: "aperture-outline",
  spark: "flash-outline",
  brake: "disc-outline",
  oilFilter: "archive-outline",
  default: "construct-outline",
};
