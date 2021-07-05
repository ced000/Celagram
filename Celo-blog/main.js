// Creating a list of post objects...
const postObjectList = [
    {
        title: "Totti",
        imageURL: "https://source.unsplash.com/300x300/?tortoise",
        desc: "Slowest pet alive",
        likes: 20,
        dislikes: 10,
        author: "https://twitter.com/afrocryptomania"
    },
    {
        title: "Cathy",
        imageURL: "https://source.unsplash.com/300x300/?cats",
        desc: "Cathy, the innocent",
        likes: 100,
        dislikes: 16,
        author: "https://twitter.com/afrocryptomania"
    },
    {
        title: "Puggy",
        imageURL: "https://source.unsplash.com/300x300/?pugs",
        desc: "Puggy, the cutest",
        likes: 250,
        dislikes: 3,
        author: "https://twitter.com/afrocryptomania"
    },
    {
        title: "Pat",
        imageURL: "https://source.unsplash.com/300x300/?parrots",
        desc: "Pat, the talking companion",
        likes: 25,
        dislikes: 1,
        author: "https://twitter.com/afrocryptomania"
    }
    // {
    //     title: "doggy",
    //     imageURL: "https://source.unsplash.com/300x300/?dogs",
    //     desc: "cuteness animated",
    //     likes: 2,
    //     dislikes: 1,
    //     author: "https://twitter.com/afrocryptomania"
    // }
];

// When window loads...
window.onload = () => {
    counter = 0;
    renderPost();
    postContents = slide();
    btnCheck();
}

// getting DOM elements...
const uploadBtn = document.getElementById('upBtn');
const container = document.getElementById('formCont');
const cancelBtn = document.getElementById('formCancel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const formUploadBtn = document.getElementById('formUpload');



// handling button events...
uploadBtn.onclick = () => {
    container.classList.add('visible');
};

cancelBtn.onclick = () => {
    container.classList.remove('visible')
};

const slide = () => {
    const postSlide = document.querySelector('.post-slide')
    const postContents = document.querySelectorAll('.post-slide .post-container');
    const postWidth = postContents[0].clientWidth;
    postSlide.style.transition = 'transform 0.4s ease-in-out';
    postSlide.style.transform = 'translatex(' + (-postWidth * counter) + 'px)';

    return postContents;
}

nextBtn.onclick = () => {
    counter++;
    btnCheck();
    slide();
}

prevBtn.onclick = () => {
    counter--;
    btnCheck();
    slide();
}

// handling button appearance...
const btnCheck = () => {
    if (counter <= 0) {
        prevBtn.style.display = 'none';
    } else if ( counter >= postContents.length-1) {
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'unset';
        nextBtn.style.display = 'unset';
    };
}


// Function to render posts from list on window load...

const renderPost = () => {
    let postSlide = document.getElementById('postSlide');
    postSlide.innerHTML = '';
    postObjectList.forEach ((post) => {
        newDiv = document.createElement('div');
        newDiv.classList.add('post-container');
        newDiv.innerHTML = `
        <div class="post-image">
            <img src="${post.imageURL}" alt="">
            <h3>${post.title}</h3>
            <p>${post.desc}</p>
        </div>
        <ul>
            <li>
                <button id = "likeBtn" onclick = upLike()>👍</button>
                <small id = "noLikes">${post.likes}</small>
            </li>
            <li>
                <button id = "dislikeBtn" onclick = upDislike() >👎</button>
                <small id = "noDislikes">${post.dislikes}</small>
            </li>
            <li>
                <button>📤</button>
                <small>Share</small>
            </li>
        </ul>
        <a href="${post.author}" target="_blank">Author</a>
`
    postSlide.appendChild(newDiv);
    })
}

const upLike = () => {
    noLikes = postObjectList[counter].likes;
    noLikes += 1;
    postObjectList[counter].likes = noLikes;
    postContents[counter].getElementsByTagName('small')['noLikes'].innerHTML = noLikes;
}

const upDislike = () => {
    noDislikes = postObjectList[counter].dislikes;
    noDislikes += 1;
    postObjectList[counter].dislikes = noDislikes;
    postContents[counter].getElementsByTagName('small')['noDislikes'].innerHTML = noDislikes;
}



const notification = (text) => {
    const notification = document.querySelector('.notification');
    const notLoader = document.querySelector('.not-loader');
    document.querySelector('.not-text').innerHTML = text;
    notification.style.transform = 'translatex(100%)';
    notification.addEventListener('transitionend', () => {notLoader.style.transform = 'translatex(-100%)';});
    setTimeout(() => {
        notification.style.transform = 'translatex(-100%)';
        notification.addEventListener('transitionend', () => {
            notLoader.style.transform = 'unset';
        });
    }, 5000);
}

const addProduct = () => {
    let petPost = {};
    let name = document.getElementById('petName').value;
    let imgUrl = document.getElementById('imgUrl').value;
    let desc = document.getElementById('desc').value;
    let author = document.getElementById('authorHandle').value;
    // filling up petPost object. 
    petPost.title = name;
    petPost.imageURL = imgUrl;
    petPost.desc = desc;
    petPost.author = author;
    petPost.likes = 0;
    petPost.dislikes = 0;

    postObjectList.push(petPost);
    renderPost();
    postContents = slide();
    btnCheck();
    container.classList.remove('visible');
    notification('🚀 New pet added!');

}

formUploadBtn.onclick = addProduct;