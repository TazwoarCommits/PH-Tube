// calculate time 

function getTimeString(time) {

  const hour = parseInt(time / 3600);

  let remainingSecond = parseInt(time % 3600)

  const minute = parseInt(remainingSecond / 60)

  remainingSecond = remainingSecond % 60

  return `${hour}hr ${minute}min ${remainingSecond}sec `
}


// fetch , load and show catagories in HTML

// Load categories
const loadCatagories = () => {
    // fetch catagories from api
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))

}


// Load videos
const loadVideo = () => {
    // fetch catagories from api
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(err => console.log(err))

}



// 
// display videos

const displayVideo = (videos) => {
    const videoContainer = document.getElementById('videos');

    videos.forEach(video => {
        console.log(video)
        const card = document.createElement('div');
        card.classList = "card card-compact"

        card.innerHTML =
            ` 
       <figure class="h-[200px] rounded-lg relative">
        <img class = "h-full w-full object-cover"
          src="${video.thumbnail}"
          alt="thumbnail" />
          ${video.others.posted_date?.length === 0 ? "" : `<span class ="absolute right-4 bottom-2 p-1 rounded-lg bg-slate-800 text-gray-200 text-xs ">${getTimeString(video.others?.posted_date)}</span>`}
          
      </figure>
      <div class="py-2 px-0 gap-2 flex ml-1">
        <div>
             <img class = "w-10 h-10 rounded-full object-cover"
             src = "${video.authors[0].profile_picture}" >
        </div>
        <div>
          <h2 class="font-bold text-lg">${video.title}</h2>
          <div class="flex items-center gap-2">
            <p>${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? `<img class="w-4 h-4"
             src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : ""}
          </div>
          <p>${video.others.views}</p>
        </div>
      </div>
    
      `

        videoContainer.append(card)
    });

}

// create display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')
    categories.forEach(item => {

        // create a button
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        categoryContainer.append(button)
    })

}



// calling functions
loadVideo()
loadCatagories()