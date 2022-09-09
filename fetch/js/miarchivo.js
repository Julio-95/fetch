function traerAutos() {fetch("/data.json")
.then(response => response.text())
.then(data => {
  const automovil = JSON.parse(data);
  console.log(automovil);
  return(automovil)
});
}
let automovil = traerAutos
const automovilarray = [...automovil];
let cart=[]

function setCategoryFilter(category) {
  automovil = [...automovilarray];
  if (category == 'Autos' || category == 'Camionetas') {
    automovil = automovil.filter((item) => item.category == category);
  }
  renderAutomovil();
}

function renderAutomovil() {
  let html = '';
  for (let i = 0; i < automovil.length; i++) {
    html =
      html +
      `
	  <div onclick="addToCart(${automovil[i].id});" style="border: 1px solid green;margin: 10px;">
		<p>id: ${automovil[i].id}</p>
		<p>nombre: ${automovil[i].name}</p>
		<p>precio: ${automovil[i].price}</p>
		<p>categoria: ${automovil[i].category}</p>
		<p>Marca: ${automovil[i].brand}</p>
		<p>
		  <img style="width:100px;height:100px;" src="${automovil[i].img}" />
		</p>
		</div>
	  `;
  }
  document.getElementById('div-automovil').innerHTML = html;
}

function renderCart() {
  if (cart.length == 0) {
    document.getElementById('div-cart').innerHTML = '<h3>Aqui vera su proximo vehiculo</h3>';
  } else {
    let html = '';
    for (let i = 0; i < cart.length; i++) {
      html =
        html +
        `
		<div style="border: 1px solid green;margin: 10px;">
		<p>id: ${cart[i].id}</p>
		<p>nombre: ${cart[i].name}</p>
		<p>precio: ${cart[i].price}</p>
		<p>categoria: ${cart[i].category}</p>
		<p>
		<img style="width:100px;height:100px;" src="${cart[i].img}" />
		</p>
		<span style="cursor:pointer;" onclick="remove(${i})">-🚗</span>
		</div>
		`;
    }
    document.getElementById('div-cart').innerHTML = html;
  }
}

function addToCart(id) {
  const foundAutomovil = automovil.find((item) => item.id == id);
  cart.push(foundAutomovil);
  renderCart();
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Su Automovil ha sido agregado al carro',
    showConfirmButton: false,
    timer: 1500
  })
  desestructurar(foundAutomovil);
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

function remove(){swalWithBootstrapButtons.fire({
  title: 'Está seguro de eliminar el producto?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sí, seguro',
  cancelButtonText: 'No, no quiero',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Borrado!',
      'El automovil ha sido quitado del carro',
      'success'
    )
    removeFromCart()
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelado',
      'Su compra sigue en pie:)',
      'error'
    )
  }
})
}
function removeFromCart(id) {
  cart.splice(id, 1);
        renderCart()
    };

renderAutomovil();

const desestructurar = ( {name,price} ) => {
  console.log(name,price)
}

desestructurar(cart);
