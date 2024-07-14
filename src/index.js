document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.add-toy-form');
  const newToyBtn = document.getElementById('new-toy-btn');

  // Fetch toys and render them
  function fetchToys() {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => {
        toys.forEach(toy => renderToy(toy));
      })
      .catch(error => console.error('Error fetching toys:', error));
  }

  // Render a single toy card
  function renderToy(toy) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" data-id="${toy.id}">Like ❤️</button>
    `;
    
    // Like button event listener
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
      const newLikes = toy.likes + 1;
      updateLikes(toy.id, newLikes);
    });

    toyCollection.appendChild(card);
  }

  // Update likes for a toy
  function updateLikes(toyId, newLikes) {
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then(response => response.json())
      .then(updatedToy => {
        const toyCard = document.querySelector(`.card[data-id="${toyId}"]`);
        if (toyCard) {
          const likeParagraph = toyCard.querySelector('p');
          likeParagraph.textContent = `${updatedToy.likes} Likes`;
        }
      })
      .catch(error => console.error('Error updating likes:', error));
  }

  // Add new toy form submission
  toyForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(toyForm);
    const name = formData.get('name');
    const image = formData.get('image');
    
    const newToy = {
      name,
      image,
      likes: 0, // Initial likes
    };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newToy),
    })
      .then(response => response.json())
      .then(createdToy => {
        renderToy(createdToy);
        toyForm.reset();
      })
      .catch(error => console.error('Error adding new toy:', error));
  });

  // Toggle new toy form visibility
  let addToy = false;
  newToyBtn.addEventListener('click', () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  });

  // Initial fetch and render
  fetchToys();
});



let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
