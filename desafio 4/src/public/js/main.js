const socket = io();

socket.on("products", (data) => {
    const list = document.getElementById("productList");

    let cards = "";

    data.forEach(item => {
        cards += `
            <div class="card" style="width: 18rem;">
                <img src=${item.thumbnail} class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">${item.price}</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
        `;
    });

    list.innerHTML = cards;
});