let baseCharacterImage;
let baseCharacterLoaded = false;
let selectHair = null;
let selectFace = null;
let selectClothing = null;
let selectAccessories = null;
let selectBackground = null;

function loadCharacter() {
    const canvas = document.getElementById('character-canvas');
    const ctx = canvas.getContext('2d');

    // Load hình ảnh nhân vật
    baseCharacterImage = new Image();
    baseCharacterImage.src = 'assets/characters/phong_des0.png';
    baseCharacterImage.onload = () => {
        console.log("Tải nhân vật thành công!");
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Xóa canvas trước khi vẽ lại
        
        // Vẽ nền trắng sau lưng hình ảnh nhân vật
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(baseCharacterImage, 0, 0, canvas.width, canvas.height);
        baseCharacterLoaded = true;
    };

    baseCharacterLoaded = false;
}

function loadClothingOptions(category) {
    const clothingMenu = document.getElementById('clothing-menu');
    clothingMenu.innerHTML = '';

    let clothingItems = [];
    if (category === 'hair') {
        clothingItems = ['assets/clothing/hairs/shorthair.png','assets/clothing/hairs/longhair.png','assets/clothing/hairs/ponytailhair.png', 'assets/clothing/hairs/Normal.png', 'assets/clothing/hairs/Ponytail.png', 'assets/clothing/hairs/hair_braid.png'];
    } else if (category === 'face'){
        clothingItems = ['assets/clothing/face/Emotion_angry.png', 'assets/clothing/face/Emotion_normal.png', 'assets/clothing/face/Emotion_sad.png', 'assets/clothing/face/Emotion_shy.png', 'assets/clothing/face/Emotion_surprised.png'];
    } else if (category === 'clothing') {
        clothingItems = ['assets/clothing/clothings/hoodie.png','assets/clothing/clothings/normal.png','assets/clothing/clothings/summer.png','assets/clothing/clothings/wedding.png','assets/clothing/clothings/winter.png', 'assets/clothing/clothings/Cloth_normal.png', 'assets/clothing/clothings/Cloth_summer.png', 'assets/clothing/clothings/Cloth_wedding.png', 'assets/clothing/clothings/Cloth_winter.png'];
    } else if (category === 'accessories') {
        clothingItems = ['assets/clothing/accessories/strawhat.png', 'assets/clothing/accessories/Details_bouquet.png', 'assets/clothing/accessories/Details_hat.png'];
    }

    clothingItems.forEach(itemSrc => {
        const img = document.createElement('img');
        img.src = itemSrc;
        img.classList.add('clothing-item');

        // Sử dụng sự kiện click để chọn trang phục
        img.onclick = () => {
            if (category === 'hair') {
                selectHair = (selectHair === itemSrc) ? null : itemSrc;
            } else if(category === 'face'){
                selectFace = (selectFace === itemSrc) ? null : itemSrc;
            } else if (category === 'clothing') {
                selectClothing = (selectClothing === itemSrc) ? null : itemSrc;
            } else if (category === 'accessories') {
                selectAccessories = (selectAccessories === itemSrc) ? null : itemSrc;
            }
            redrawCharacter();
        };

        // Sử dụng sự kiện dblclick để xóa lựa chọn
        img.ondblclick = () => {
            if (category === 'hair' && selectHair === itemSrc) {
                selectHair = null;
            } else if (category === 'face' && selectClothing === itemSrc) {
                selectClothing = null;
            } else if (category === 'clothing' && selectClothing === itemSrc) {
                selectClothing = null;
            } else if (category === 'accessories' && selectAccessories === itemSrc) {
                selectAccessories = null;
            }
            redrawCharacter();
        };

        clothingMenu.appendChild(img);
    });
}

function loadBackgroundOptions() {
    const clothingMenu = document.getElementById('clothing-menu');
    clothingMenu.innerHTML = '';

    const backgroundItems = ['assets/backgrounds/background1.jpg', 'assets/backgrounds/background2.png', 'assets/backgrounds/background3.jpg','assets/backgrounds/background4.jpg', 'assets/backgrounds/background5.png', 'assets/backgrounds/background7.jpg', 'assets/backgrounds/background8.png', 'assets/backgrounds/background10.jpg', 'assets/backgrounds/background11.jpg'];

    backgroundItems.forEach(itemSrc => {

        const img = document.createElement('img');
        img.src = itemSrc;
        img.classList.add('clothing-item');

        // Sử dụng sự kiện click để chọn nền
        img.onclick = () => {
            selectBackground = (selectBackground === itemSrc) ? null : itemSrc;
            redrawCharacter();
        };

        // Sử dụng sự kiện dblclick để xóa lựa chọn
        img.ondblclick = () => {
            if (selectBackground === itemSrc) {
                selectBackground = null;
            }
            redrawCharacter();
        };

        clothingMenu.appendChild(img);
    });
}

function selectCategory(category) {
    const clothingMenu = document.getElementById('clothing-menu');
    clothingMenu.innerHTML = '';
    // Hiển thị các tùy chọn trang phục cho danh mục đã chọn
    if (category === 'background'){
        loadBackgroundOptions();
    } else {
        loadClothingOptions(category)
    }
}

function applyClothing(itemSrc, category) {
     //Thêm trang phục đã chọn lên nhân vật trong canvas
    const canvas = document.getElementById('character-canvas');
    const ctx = canvas.getContext('2d');

    if (!baseCharacterLoaded){
        console.error("Hình ảnh nhân vật chưa tải xong!");
        return;
    }

    const clothingItem = new Image();
    clothingItem.src = itemSrc;
    clothingItem.onload = () => {
        console.log("Đã tải quần áo thành công!", itemSrc);

        //Cập nhật trạng thái của các mục đã chọn
        if(category === 'hair'){
            selectHair = clothingItem;
        } else if (category === 'face'){
            selectFace = clothingItem;
        } else if (category === 'clothing'){
            selectClothing = clothingItem;
        } else if (category === 'accessories'){
            selectAccessories = clothingItem;
        }
        //Vẽ lại toàn bộ nhân vật với các mục đã chọn
        redrawCharacter();
    };
}

function applyBackground(itemSrc) {
    const canvas = document.getElementById('character-canvas');
    const ctx = canvas.getContext('2d');

    const backgroundImage = new Image();
    backgroundImage.src = itemSrc;
    backgroundImage.onload = () => {
        console.log("Đã tải nền thành công!", itemSrc);

        // Cập nhật trạng thái của nền đã chọn
        selectBackground = backgroundImage;

        // Vẽ lại toàn bộ hình ảnh
        redrawCharacter();
    };
}

function redrawCharacter() {
    const canvas = document.getElementById('character-canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ lại

    // Vẽ nền trắng sau lưng hình ảnh nhân vật
    ctx.fillStyle = '#ffffff'; // Màu trắng
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ background trước (nếu có)
    if (selectBackground) {
        //ctx.drawImage(selectBackground, 0, 0, canvas.width, canvas.height);
        const backgroundImage = new Image();
        backgroundImage.src = selectBackground;
        backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
    }

    // Vẽ nhân vật và các phụ kiện
    if (baseCharacterLoaded) {
        ctx.drawImage(baseCharacterImage, 0, 0, canvas.width, canvas.height);
        if (selectHair) {
            //ctx.drawImage(selectHair, 0, 0, canvas.width, canvas.height);
            const hairImage = new Image();
            hairImage.src = selectHair;
            hairImage.onload = () => {
                ctx.drawImage(hairImage, 0, 0, canvas.width, canvas.height);
            };
        }
        if (selectFace) {
            //ctx.drawImage(selectHair, 0, 0, canvas.width, canvas.height);
            const faceImage = new Image();
            faceImage.src = selectFace;
            faceImage.onload = () => {
                ctx.drawImage(faceImage, 0, 0, canvas.width, canvas.height);
            };
        }
        if (selectClothing) {
            //ctx.drawImage(selectClothing, 0, 0, canvas.width, canvas.height);
            const clothingImage = new Image();
            clothingImage.src = selectClothing;
            clothingImage.onload = () => {
                ctx.drawImage(clothingImage, 0, 0, canvas.width, canvas.height);
            };
        }
        if (selectAccessories) {
            //ctx.drawImage(selectAccessories, 0, 0, canvas.width, canvas.height);
            const accessoriesImage = new Image();
            accessoriesImage.src = selectAccessories;
            accessoriesImage.onload = () => {
                ctx.drawImage(accessoriesImage, 0, 0, canvas.width, canvas.height);
            };
        }
    }
}


function saveCharacter() {
    // Lưu hình ảnh của nhân vật hiện tại
    const canvas = document.getElementById('character-canvas');
    const link = document.createElement('a');
    link.download = 'character.png';
    link.href = canvas.toDataURL();
    link.click();
}

function resetCharacter() {
    // Tải lại các lựa chọn trang phục
    const canvas = document.getElementById('character-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadCharacter();
    selectHair = null;
    selectClothing = null;
    selectAccessories = null;
    selectBackground = null;
}

// function shareCharacter() {
//     // Chia sẻ hình ảnh của nhân vật
//     alert('Tính năng chia sẻ chưa được triển khai.');
// }


function toggleShareMenu() {
    const shareMenu = document.getElementById('share-menu');
    shareMenu.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    // const shareButton = document.getElementById('share-button');
    // const shareMenu = document.getElementById('share-menu');
    const shareEmail = document.getElementById('share-email');
    const shareFacebook = document.getElementById('share-facebook');
    const shareTwitter = document.getElementById('share-twitter');

    // shareButton.addEventListener('click', function() {
    //     shareMenu.classList.toggle('hidden');
    // });

    shareEmail.addEventListener('click', function(event) {
        event.preventDefault();
        shareByEmail();
    });

    shareFacebook.addEventListener('click', function(event) {
        event.preventDefault();
        shareOnFacebook();
    });

    shareTwitter.addEventListener('click', function(event) {
        event.preventDefault();
        shareOnTwitter();
    });
});

function shareByEmail() {
    const canvas = document.getElementById('character-canvas');
    const imageData = canvas.toDataURL(); // Convert canvas to base64 image data

    const subject = encodeURIComponent('Check out my character!');
    const body = encodeURIComponent('Hey,\n\nHere is my character:\n\n' + imageData);

    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}

function shareOnFacebook() {
    const canvas = document.getElementById('character-canvas');
    const imageData = canvas.toDataURL();

    FB.ui({
        method: 'share',
        href: 'your-website-url', // Replace with your website URL
        hashtag: '#characterdesign',
        quote: 'Check out my character!',
        picture: imageData,
    });
}

function shareOnTwitter() {
    const canvas = document.getElementById('character-canvas');
    const imageData = canvas.toDataURL();

    const tweetText = encodeURIComponent('Check out my character!');
    const tweetUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('your-website-url') + '&text=' + tweetText;

    window.open(tweetUrl);
}


window.onload = () => {
    loadCharacter();
};
