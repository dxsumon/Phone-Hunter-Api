const loadData = async (phoneName) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (data) => {
  const phoneContainer = document.getElementById("phoneContainer");
  phoneContainer.textContent ='';
  console.log(phoneContainer.length);
  const showAll = document.getElementById('show-all-button');
  if(data.length>14){
    showAll.classList.remove('hidden');
  }
  else{
    showAll.classList.add('hidden');
  }
  data = data.slice(0,14);
  data.forEach((phone) => {
    const phoneSection = document.createElement("div");
    phoneSection.classList = `card w-96 mx-auto bg-base-100 shadow-xl border-2 m-4`;
    phoneSection.innerHTML = `
        <figure class="px-10 pt-10">
              <img
                src="${phone.image}"
                alt=""
                class="rounded-xl"
              />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p class="text-black">There are many variations of passages of available, but the majority have suffered </p>
              <p class="text-xl">${phone.slug}</p>
              <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>`;
    phoneContainer.appendChild(phoneSection);
    console.log(phone)
  });
};

const searchField =()=> {
  loadingSpinner();
  const textInput = document.getElementById('search-field');
  const textValue = textInput.value;
  console.log(textValue)
  loadData(textValue);
}

const loadingSpinner=()=>{
  const loading = document.getElementById('loading-spinner');
  loading.classList.remove('hidden')
}

loadData();
