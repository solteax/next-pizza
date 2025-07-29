export const categories = [
  { name: "Pizzas", translationKey: "pizzas" },
  { name: "Breakfast", translationKey: "breakfast" },
  { name: "Snacks", translationKey: "snacks" },
  { name: "Cocktails", translationKey: "cocktails" },
  { name: "Drinks", translationKey: "drinks" },
]

export const _ingredients = [
  {
    name: "Cheese-filled crust",
    price: 2.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
    translationKey: "cheeseFilledCrust",
  },
  {
    name: "Creamy mozzarella",
    price: 1,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
    translationKey: "creamyMozzarella",
  },
  {
    name: "Cheddar and parmesan cheeses",
    price: 1.2,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
    translationKey: "cheddarAndParmesanCheeses",
  },
  {
    name: "Spicy jalapeño peppers",
    price: 0.8,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
    translationKey: "spicyJalapenoPeppers",
  },
  {
    name: "Tender chicken",
    price: 1.3,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
    translationKey: "tenderChicken",
  },
  {
    name: "Mushrooms",
    price: 0.9,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
    translationKey: "mushrooms",
  },
  {
    name: "Ham",
    price: 1.2,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
    translationKey: "ham",
  },
  {
    name: "Spicy pepperoni",
    price: 1.3,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
    translationKey: "spicyPepperoni",
  },
  {
    name: "Spicy chorizo",
    price: 1.3,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
    translationKey: "spicyChorizo",
  },
  {
    name: "Pickled cucumbers",
    price: 0.8,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
    translationKey: "pickledCucumbers",
  },
  {
    name: "Fresh tomatoes",
    price: 0.9,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
    translationKey: "freshTomatoes",
  },
  {
    name: "Red onion",
    price: 0.7,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
    translationKey: "redOnion",
  },
  {
    name: "Juicy pineapples",
    price: 1,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
    translationKey: "juicyPineapples",
  },
  {
    name: "Italian herbs",
    price: 0.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
    translationKey: "italianHerbs",
  },
  {
    name: "Sweet pepper",
    price: 0.9,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
    translationKey: "sweetPepper",
  },
  {
    name: "Feta cubes",
    price: 1.2,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
    translationKey: "fetaCubes",
  },
  {
    name: "Meatballs",
    price: 1.5,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
    translationKey: "meatballs",
  },
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
  {
    name: "Omelet with Ham and Mushrooms",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
    categoryId: 2,
    translationKey: "omeletWithHamAndMushrooms",
  },
  {
    name: "Omelet with Pepperoni",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
    categoryId: 2,
    translationKey: "omeletWithPepperoni",
  },
  {
    name: "Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryId: 2,
    translationKey: "latte",
  },
  {
    name: "Denwich Ham & Cheese",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
    categoryId: 3,
    translationKey: "denwichHamAndCheese",
  },
  {
    name: "Chicken Nuggets",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
    categoryId: 3,
    translationKey: "chickenNuggets",
  },
  {
    name: "Oven-Baked Potatoes with Sauce 🌱",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
    categoryId: 3,
    translationKey: "ovenBakedPotatoesWithSauce",
  },
  {
    name: "Dodster",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
    categoryId: 3,
    translationKey: "dodster",
  },
  {
    name: "Spicy Dodster 🌶️🌶️",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
    categoryId: 3,
    translationKey: "spicyDodster",
  },
  {
    name: "Banana Milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp",
    categoryId: 4,
    translationKey: "bananaMilkshake",
  },
  {
    name: "Caramel Apple Milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp",
    categoryId: 4,
    translationKey: "caramelAppleMilkshake",
  },
  {
    name: "Oreo Cookie Milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
    categoryId: 4,
    translationKey: "oreoCookieMilkshake",
  },
  {
    name: "Classic Milkshake 👶",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
    categoryId: 4,
    translationKey: "classicMilkshake",
  },
  {
    name: "Irish Cappuccino",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp",
    categoryId: 5,
    translationKey: "irishCappuccino",
  },
  {
    name: "Caramel Cappuccino",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
    categoryId: 5,
    translationKey: "caramelCappuccino",
  },
  {
    name: "Coconut Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
    categoryId: 5,
    translationKey: "coconutLatte",
  },
  {
    name: "Americano",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
    categoryId: 5,
    translationKey: "americano",
  },
  {
    name: "Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    categoryId: 5,
    translationKey: "latte",
  },
]
