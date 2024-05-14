document.addEventListener("DOMContentLoaded", function () {
  const gifs = document.querySelectorAll(".clickable-gif");
  gifs.forEach((gif) => {
    gif.addEventListener("click", function () {
      // Ensure only the clicked gif is enlarged and playing
      gifs.forEach((g) => {
        g.classList.remove("enlarged");
        if (g !== this) {
          g.src = g.getAttribute("data-static"); // Reset other GIFs to static image
        }
      });

      // Create a new Audio object for fresh playback
      const soundToPlay = new Audio(this.getAttribute("data-sound"));

      // Enlarge the image when sound plays
      this.classList.add("enlarged");

      // Start playing the sound
      soundToPlay.play();

      // Event when sound is playing, reset the GIF to ensure it starts from the beginning
      soundToPlay.addEventListener("play", () => {
        this.src = ""; // Clear the src to stop the GIF
        this.src = this.getAttribute("data-animated"); // Restart the GIF
      });

      // When sound ends, remove enlargement and reset to static image
      soundToPlay.onended = () => {
        this.src = this.getAttribute("data-static");
        this.classList.remove("enlarged");
      };
    });
  });
});
