// Éléments communs à tout le panier
const productList = document.querySelector(".list-products");
const totalElement = document.querySelector(".total");

const LIKED_COLOR = "red";

// Recalcule le total à partir des produits encore présents dans le DOM :
// un produit supprimé n'est donc plus jamais compté.
function updateTotal() {
  let total = 0;

  productList.querySelectorAll(".card").forEach((card) => {
    const unitPrice = parseFloat(card.querySelector(".unit-price").textContent);
    const quantity = parseInt(card.querySelector(".quantity").textContent, 10);
    total += unitPrice * quantity;
  });

  totalElement.textContent = `${total} $`;
}

// Ajoute delta (+1 ou -1) à la quantité, sans jamais descendre sous 0
function changeQuantity(card, delta) {
  const quantityElement = card.querySelector(".quantity");
  const quantity = parseInt(quantityElement.textContent, 10);

  quantityElement.textContent = Math.max(0, quantity + delta);
  updateTotal();
}

// Retire tout le bloc du produit de la liste
function removeProduct(card) {
  card.parentElement.remove();
  updateTotal();
}

// Alterne entre la couleur « aimé » et la couleur d'origine du CSS
function toggleLike(heart) {
  heart.style.color = heart.style.color === LIKED_COLOR ? "" : LIKED_COLOR;
}

// Un seul écouteur sur la liste suffit : le clic remonte depuis les icônes
productList.addEventListener("click", (event) => {
  const target = event.target;
  const card = target.closest(".card");

  if (target.classList.contains("fa-plus-circle")) {
    changeQuantity(card, 1);
  } else if (target.classList.contains("fa-minus-circle")) {
    changeQuantity(card, -1);
  } else if (target.classList.contains("fa-trash-alt")) {
    removeProduct(card);
  } else if (target.classList.contains("fa-heart")) {
    toggleLike(target);
  }
});
