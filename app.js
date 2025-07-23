const button = document.querySelector("button");
const optionCategories = document.querySelector("#category-tag-anime");
const heroSectionBG = document.querySelector(".hero-section");
const imagePlace = document.querySelector("#image-place");
const tagPlace = document.querySelector("#tag-place");
const tagArea = document.querySelector("#text-area");
const downloadPlace = document.querySelector("#download-place");
const atribute = document.querySelector("#visibility");

button.addEventListener("click", async () => {
  try {
    const req = await axios.get(
      `https://api.nekosia.cat/api/v1/images/${optionCategories.value}`
    );
    const textCopyRight = document.createElement("a");
    const placeCopyRight = document.createElement("div");
    placeCopyRight.classList.add(
      "card-footer",
      "text-center",
      "text-muted",
      "small",
      "fst-italic"
    );
    const profilAuthors = req.data.attribution.artist.profile;
    textCopyRight.href = profilAuthors;
    textCopyRight.target = "_blank";
    textCopyRight.innerText = req.data.attribution.copyright;

    const placeDownload = document.createElement("div");
    placeDownload.classList.add("text-center", "pb-3");

    const buttonDownload = document.createElement("button");
    buttonDownload.classList.add("btn", "btn-primary");
    buttonDownload.id = "download-btn";
    buttonDownload.innerText = "Download image";

    const img = document.createElement("img");
    img.src = req.data.image.original.url;
    img.classList.add("card-img-top", "img-fluid", "rounded-top");
    atribute.removeAttribute("id");

    imagePlace.innerHTML = "";

    imagePlace.append(img);

    tagArea.innerHTML = "";

    imagePlace.appendChild(tagPlace);

    imagePlace.append(placeDownload);
    placeDownload.append(buttonDownload);

    placeCopyRight.append(textCopyRight);
    imagePlace.append(placeCopyRight);

    getTags(req.data.tags);

    buttonDownload.addEventListener("click", async () => {
      const imageURL = req.data.image.original.url;
      console.log(imageURL);
      try {
        const responseURL = await fetch(imageURL, { mode: "cors" });
        const blob = await responseURL.blob();
        const bloblURL = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = bloblURL;
        a.download = `Anime Create By ${req.data.attribution.artist.username}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(bloblURL);
      } catch (error) {
        alert(
          "Gagal mengunduh gambar. Mungkin karena CORS dibatasi oleh server"
        );
        console.error(error);
      }
    });
  } catch (error) {
    alert(error.message);
  }
});

const getTags = (req) => {
  for (const tags of req) {
    const spanTag = document.createElement("span");
    spanTag.classList.add("fw-bold", "badge", "text-bg-primary", "mx-2");
    spanTag.innerText = tags;
    tagArea.append(spanTag);
  }
};

function changeBackground(url) {
  heroSectionBG.style.backgroundImage = `url('${url}')`;
}

setInterval(async () => {
  const req = await axios.get("https://api.nekosia.cat/api/v1/images/random");
  const imgURL = req.data.image.original.url;
  changeBackground(imgURL);
}, 18500);
