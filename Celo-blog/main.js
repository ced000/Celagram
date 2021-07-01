// Creating a list of post objects...
const postObjectList = [
    {
        title: "Totti",
        imageURL: "https://imgur.com/rne8QyY.jpg",
        desc: "Slowest pet alive",
        likes: 20,
        dislikes: 10,
        author: "https://twitter.com/afrocryptomania"
    },
    {
        title: "Cathy",
        imageURL: "https://imgur.com/DspN52g.jpg",
        desc: "Cathy, the innocent",
        likes: 100,
        dislikes: 16,
        author: "https://twitter.com/afrocryptomania"
    },
    {
        title: "Puggy",
        imageURL: "https://imgur.com/MA1PGYb.jpg",
        desc: "Puggy, the cutest",
        likes: 250,
        dislikes: 3,
        author: "https://twitter.com/afrocryptomania"
    },
    {
        title: "Pat",
        imageURL: "https://imgur.com/rTY4Xkl.png",
        desc: "Pat, the talking companion",
        likes: 25,
        dislikes: 1,
        author: "https://twitter.com/afrocryptomania"
    },
];

// getting DOM elements...
const uploadBtn = document.getElementById('upBtn');
const container = document.getElementById('formCont');
const cancelBtn = document.getElementById('formCancel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');


// handling button events...
uploadBtn.onclick = () => {
    container.classList.add('visible');
};

cancelBtn.onclick = () => {
    container.classList.remove('visible')
};

nextBtn.onclick = () => {
    counter++;
    btnCheck();
    postSlide.style.transition = 'transform 0.4s ease-in-out';
    postSlide.style.transform = 'translatex(' + (-postWidth * counter) + 'px)';
}

prevBtn.onclick = () => {
    counter--;
    btnCheck();
    postSlide.style.transition = 'transform 0.4s ease-in-out';
    postSlide.style.transform = 'translatex(' + (-postWidth * counter) + 'px)';
}

// handling button appearance...
const btnCheck = () => {
    if (counter <= 0) {
        prevBtn.style.display = 'none';
    } else if ( counter >= postContents.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'unset';
        nextBtn.style.display = 'unset';
    };
}

// When window loads...
window.onload = () => {
    counter = 0;
    renderPost();
    postSlide = document.querySelector('.post-slide');
    postContents = document.querySelectorAll('.post-slide .post-container');
    postWidth = postContents[0].clientWidth;
    postSlide.style.transform = 'translatex(' + (-postWidth * counter) + 'px)';
    btnCheck();
}

// Function to render posts from list on window load...

const renderPost = () => {
    let postSlide = document.getElementById('postSlide');
    if (postSlide.innerHTML) postSlide.innerHTML = '';
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
                <button>👍</button>
                <small>${post.likes}</small>
            </li>
            <li>
                <button>👎</button>
                <small>${post.dislikes}</small>
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

    return postSlide;
}