const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToy = document.querySelector(".add-toy-form")
let addToy = false

// YOUR CODE HERE


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!




function createCards(toys){
  const contain = document.querySelector("#toy-collection")
  toys.forEach(toy => {
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const p = document.createElement("p")
    const button = document.createElement("button")

    button.addEventListener("click", () => addLikesToToy(toy, toy.id))

    button.className = "like-btn"
    div.className = "card"
    img.className = "toy-avatar"
    img.src = toy.image
    
    button.textContent = "Like this toy"
    h2.textContent = toy.name
    p.textContent = toy.likes

    div.append(h2, img, p, button)
    contain.append(div)
  })
}

(function createNewToy(){

  newToy.addEventListener("submit", event => {
    event.preventDefault()
    const formData = new FormData(newToy)
    const name = formData.get("name")
    const image = formData.get("image")
    const likes = 0
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        image,
        likes
      })
    }).then(response => response.json())
    
  })

})();


function addLikesToToy(toy, id){
  const like = toy.likes
  const newLike = like + 1

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: newLike
    })
  })

}

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(createCards)
