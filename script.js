document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const songInfo = document.querySelector('.song-info');
    const songTitle = document.getElementById('songTitle');
    const artistElement = document.getElementById('artist');
    const albumImage = document.getElementById('albumImage');
    const elapsedTimeLeft = document.getElementById('elapsedTimeLeft');
    const elapsedTimeRight = document.getElementById('elapsedTimeRight');
    const progressLine = document.getElementById('progressLine');

    let isPlaying = false;
    let currentSongIndex = 0;

    const songs = [
        {
            title: 'Oksihina',
            artist: 'Dionela',
            albumImage: '1.jpeg',
            audio: 'Oksihina.mp3',
        },
        {
            title: 'Palagi',
            artist: 'TJ Monterde',
            albumImage: '2.jpeg',
            audio: 'Palagi.mp3',
        },
        {
            title: 'Mananatili',
            artist: 'Cup of Joe',
            albumImage: '3.jpeg',
            audio: 'Mananatili.mp3',
        }
    ];

    function playPause() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.classList.remove('bx-pause-circle');
            playBtn.classList.add('bx-play-circle');
        } else {
            audioPlayer.play();
            playBtn.classList.remove('bx-play-circle');
            playBtn.classList.add('bx-pause-circle');
        }
        isPlaying = !isPlaying;
    }

    function loadSong(index) {
        const currentSong = songs[index];
        songTitle.innerText = currentSong.title;
        artistElement.innerText = currentSong.artist;
        albumImage.src = currentSong.albumImage;
        audioPlayer.src = currentSong.audio;
        audioPlayer.load();

        document.querySelectorAll('.song-info').forEach(info => {
            info.classList.remove('playing');
        });

        songInfo.classList.add('playing');

        updateElapsedTime();
    }

    function playNext() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    function playPrev() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    function updateElapsedTime() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const currentFormattedTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        elapsedTimeLeft.innerText = currentFormattedTime;

        if (duration > 0) {
            const remainingTime = duration - currentTime;
            const remainingMinutes = Math.floor(remainingTime / 60);
            const remainingSeconds = Math.floor(remainingTime % 60);
            const remainingFormattedTime = `-${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
            elapsedTimeRight.innerText = remainingFormattedTime;

            const progressPercent = (currentTime / duration) * 100;
            progressLine.style.width = progressPercent + '%';
        }
    }

    playBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);

    audioPlayer.addEventListener('ended', playNext);

    audioPlayer.addEventListener('timeupdate', updateElapsedTime);

    songInfo.addEventListener('click', function (event) {
        const clickX = event.clientX - songInfo.getBoundingClientRect().left;
        const percent = clickX / songInfo.offsetWidth;
        const newTime = percent * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
        updateElapsedTime();
    });

    loadSong(currentSongIndex);
});
