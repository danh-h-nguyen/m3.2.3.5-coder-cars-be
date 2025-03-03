const fs = require("fs");

const makes = [
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Chevrolet",
  "Tesla",
  "Nissan",
  "Hyundai",
];
const models = [
  "Camry",
  "Accord",
  "Mustang",
  "3 Series",
  "C-Class",
  "A4",
  "Malibu",
  "Model S",
  "Altima",
  "Sonata",
];
const styles = ["Sedan", "SUV", "Coupe", "Truck", "Hatchback", "Convertible"];
const transmissionTypes = [
  "AUTOMATIC",
  "MANUAL",
  "AUTOMATED_MANUAL",
  "DIRECT_DRIVE",
];
const sizes = ["Compact", "Midsize", "Large"];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCarData() {
  return {
    make: getRandomElement(makes),
    model: getRandomElement(models),
    release_date: Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950,
    year: Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950,
    transmission_type: getRandomElement(transmissionTypes),
    size: getRandomElement(sizes),
    style: getRandomElement(styles),
    price: Math.floor(Math.random() * (100000 - 15000 + 1)) + 15000,
    isDeleted: false,
  };
}

const cars = Array.from({ length: 100 }, generateCarData).map((car) => ({
  ...car,
  name: `${car.make} ${car.model}`,
}));

fs.writeFileSync("cars.json", JSON.stringify(cars, null, 2));
console.log("✅ 100 mẫu xe đã được tạo trong file cars.json");
