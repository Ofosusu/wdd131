const products = [
  { id: "fc-1888", name: "Flux Capacitor" },
  { id: "fc-2050", name: "Time Circuits Display" },
  { id: "ncc-1701", name: "Warp Drive Controller" },
  { id: "da-42", name: "Digital Assistant" }
];

const select = document.getElementById("product");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  select.appendChild(option);
});