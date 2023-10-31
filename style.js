const error = document.querySelector(".error");
const video = document.querySelector("video");
const playPause = document.querySelector(".playPause");
const pip = document.querySelector(".pip");
const seekInput = document.querySelector(".seek");

seekInput.addEventListener("input", () => {
   const seekTime = (seekInput.value / 100) * video.duration;
   video.currentTime = seekTime;
});

video.addEventListener("timeupdate", () => {
   const percentage = (video.currentTime / video.duration) * 100;
   seekInput.value = percentage;
});

video.addEventListener("pause", e => {
   playPause.innerText = "Play video";
});

video.addEventListener("play", e => {
   playPause.innerText = "Pause video";
});

video.addEventListener("leavepictureinpicture", e => {
   pip.innerText = "Enter picture-in-picture mode";
});

video.addEventListener("enterpictureinpicture", e => {
   pip.innerText = "Leave picture-in-picture mode";
});

pip.addEventListener("click", async e => {
   pip.disabled = true;
   try {
      if (!document.pictureInPictureEnabled) {
         return (error.innerText =
            "Picture-in-picture is not supported in your browser");
      }
      if (video !== document.pictureInPictureElement) {
         await video.requestPictureInPicture();
         return video.play();
      }
      await document.exitPictureInPicture();
   } catch (err) {
      error.innerText = "Error, try again!";
   } finally {
      pip.disabled = false;
   }
});

playPause.addEventListener("click", async e => {
   playPause.disabled = true;
   try {
      if (video.paused) {
         video.play();
         return (playPause.innerText = "Pause video");
      }
      video.pause();
      playPause.innerText = "Play video";
   } catch (err) {
      error.innerText = "Error, try again!";
   } finally {
      playPause.disabled = false;
   }
});
