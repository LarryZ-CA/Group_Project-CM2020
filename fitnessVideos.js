document.addEventListener('DOMContentLoaded', function() {
    console.log("ready");    
    console.log(window.location.href)
    var navLink = document.querySelectorAll("a[href='fitnessVideos.html']");
    if (navLink) {
        navLink[0].classList.add("active");
    }
})


document.getElementById('search-button').addEventListener('click', filterVideos);

function filterVideos() {

    console.log('wtf');
    const bodyPartFilter = document.getElementById('body-part-filter').value;
    const videos = document.querySelectorAll('.video-item');

    videos.forEach(video => {
        const bodyPart = video.getAttribute('data-body-part');

        const matchesFilter = bodyPart === bodyPartFilter;

        if (matchesFilter) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
}


