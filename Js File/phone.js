const loadData = async (phoneName='samsung', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones,isShowAll);
};

const displayPhone = (data,isShowAll) => {
  const phoneContainer = document.getElementById("phoneContainer");
  phoneContainer.textContent ='';
  console.log(phoneContainer.length);
  const showAll = document.getElementById('show-all-button');
  if(data.length>14 && !isShowAll){
    showAll.classList.remove('hidden');
  }
  else{
    showAll.classList.add('hidden');
  }
  // Show all items
  console.log('IS show all ', isShowAll)
  if(!isShowAll){
    data = data.slice(0,14);
  };


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
              <p class="text-xl">Brand name: <span class="font-bold text-xl">${phone.brand}</span> </p>
              <p class="text-xl font-bold">999$</p>
              <div class="w-full">
                <button onclick="showDetailsButton('${phone.slug}')" class="btn btn-primary w-full">Show Details</button>
              </div>
            </div>`;
    phoneContainer.appendChild(phoneSection);
    console.log(phone)
  });
  // Hide the loading spinner
  loadingSpinner(false);
};

// Show phones details button
const showDetailsButton =async (id)=>{
  console.log('Button Click', id)
  // Show all phone Details from the api
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  // console.log(data);
  const phoneData = data.data;
  showModal(phoneData);
}

// Show phones modal function
const showModal=(phoneDetail)=>{
  console.log(phoneDetail)
  const phoneName = document.getElementById('show-phone-name');
  const phoneDetailsContainer = document.getElementById('phone-details-container');
  phoneName.innerText = phoneDetail.name;
  phoneDetailsContainer.innerHTML=`
          <div class="flex justify-center items-center"><img src="${phoneDetail.image}" alt="" class="w-1/2"> </div>
          <p class="text-black font-bold">Storage: <span class="font-normal">${phoneDetail.mainFeatures.storage}</span></p>
          <p class="text-black font-bold">Display Size: <span class="font-normal">${phoneDetail.mainFeatures.displaySize}</span></p>
          <p class="text-black font-bold">Chipset: <span class="font-normal">${phoneDetail.mainFeatures.chipSet}</span></p>
          <p class="text-black font-bold">Memory: <span class="font-normal">${phoneDetail.mainFeatures.memory}</span></p>
          <p class="text-black font-bold">Slug: <span class="font-normal">${phoneDetail.slug}</span></p>
  `
  showDetailsModal.showModal()
}

const searchField =(isShowAll)=> {
  loadingSpinner(true);
  const textInput = document.getElementById('search-field');
  const textValue = textInput.value;
  console.log(textValue)
  loadData(textValue,isShowAll);
}

const loadingSpinner=(isLoading)=>{
  const loading = document.getElementById('loading-spinner');
  if(isLoading){
    loading.classList.remove('hidden');
  }
  else{
    loading.classList.add('hidden');
  }
}
// Show all Click handle 
const showAllItems = () => {
  searchField(true);
}

loadData();
