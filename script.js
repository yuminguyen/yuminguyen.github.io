let baseCharacterImage;
let baseCharacterLoaded = false;
let selectSkin = null;
let selectFrontHair = null;
let selectBackHair = null;
let selectFace = null;
let selectClothing = null;
let selectAccessories = null;
let selectForeground = null;
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
    if (category === 'skin') {
        clothingItems = ['assets/clothing/skins/Phong_skin.png', 'assets/clothing/skins/Le_skin.png', 'assets/clothing/skins/Liz_skin.png', 'assets/clothing/skins/Cus_skin.png'];
    } else if (category === 'face'){
        clothingItems = ['assets/clothing/faces/Phong_normal.png', 'assets/clothing/faces/Phong_happy.png', 'assets/clothing/faces/Phong_angry.png', 'assets/clothing/faces/Phong_regret.png', 'assets/clothing/faces/Phong_sad.png', 'assets/clothing/faces/Phong_shy.png', 'assets/clothing/faces/Phong_surprised.png', 'assets/clothing/faces/Le_normal.png', 'assets/clothing/faces/Le_angry.png', 'assets/clothing/faces/Le_sad.png', 'assets/clothing/faces/Le_shy.png', 'assets/clothing/faces/Le_surprised.png', 'assets/clothing/faces/Liz_emotion_normal.png', 'assets/clothing/faces/Liz_emotion_angry.png', 'assets/clothing/faces/Liz_emotion_sad.png', 'assets/clothing/faces/Liz_emotion_shy.png', 'assets/clothing/faces/Liz_emotion_smile.png', 'assets/clothing/faces/Liz_emotion_suprised.png', 'assets/clothing/faces/Cus_emotion_normal.png', 'assets/clothing/faces/Cus_emotion_angry.png', 'assets/clothing/faces/Cus_emotion_sad.png', 'assets/clothing/faces/Cus_emotion_smile.png', 'assets/clothing/faces/Cus_emotion_surprised.png'];
    } else if(category === 'frontHair') {
        clothingItems = ['assets/clothing/frontHairs/Phong_hair_normal.png', 'assets/clothing/frontHairs/Phong_hair_ponytail.png', 'assets/clothing/frontHairs/Phong_hair_short.png', 'assets/clothing/frontHairs/Le_ normal.png', 'assets/clothing/frontHairs/Le_ponytail.png', 'assets/clothing/frontHairs/Le_wedding.png', 'assets/clothing/frontHairs/Liz_hair_normal.png', 'assets/clothing/frontHairs/Liz_hair_custom.png', 'assets/clothing/frontHairs/Cus_hair_normal.png', 'assets/clothing/frontHairs/Cus_hair_braidedbelt.png'];
    } else if(category === 'backHair'){
        clothingItems = ['assets/clothing/back-hairs/Phong_hair_normal2.png', 'assets/clothing/back-hairs/Phong_hair_ponytail2.png', 'assets/clothing/back-hairs/Phong_hair_short2.png', 'assets/clothing/back-hairs/Le_Normal2.png', 'assets/clothing/back-hairs/Le_Ponytail2.png', 'assets/clothing/back-hairs/Le_hair_braid2.png', 'assets/clothing/back-hairs/Liz_hair_normal2.png', 'assets/clothing/back-hairs/Liz_hair_custom2.png']
    } else if (category === 'clothing') {
        clothingItems = ['assets/clothing/clothings/normal.png','assets/clothing/clothings/hoodie.png','assets/clothing/clothings/summer.png','assets/clothing/clothings/wedding.png','assets/clothing/clothings/winter.png', 'assets/clothing/clothings/Cloth_normal.png', 'assets/clothing/clothings/Cloth_summer.png', 'assets/clothing/clothings/Cloth_wedding.png', 'assets/clothing/clothings/Cloth_winter.png', 'assets/clothing/clothings/Liz_clothing_normal.png', 'assets/clothing/clothings/Liz_clothing_shirt.png', 'assets/clothing/clothings/Liz_clothing_summer.png', 'assets/clothing/clothings/Liz_clothing_vest.png', 'assets/clothing/clothings/Liz_clothing_wedding.png', 'assets/clothing/clothings/Liz_clothing_winter.png', 'assets/clothing/clothings/Liz_clothing_wool.png', 'assets/clothing/clothings/Cus_clothing_normal.png', 'assets/clothing/clothings/Cus_clothing_summer.png', 'assets/clothing/clothings/Cus_clothing_wedding.png', 'assets/clothing/clothings/Cus_clothing_wool.png', 'assets/clothing/clothings/Cus_winter_summer.png'];
    } else if (category === 'accessories') {
        clothingItems = ['assets/clothing/accessories/strawhat.png', 'assets/clothing/accessories/Details_bouquet.png', 'assets/clothing/accessories/Details_hat.png'];
    } else if (category === 'foreground') {
        clothingItems = ['assets/clothing/foregrounds/sparkle.png', 'assets/clothing/foregrounds/heart.png', 'assets/clothing/foregrounds/mark.png', 'assets/clothing/foregrounds/point.png', 'assets/clothing/foregrounds/sad.png'];
    }

    clothingItems.forEach(itemSrc => {
        const img = document.createElement('img');
        img.src = itemSrc;
        img.classList.add('clothing-item');

        // Sử dụng sự kiện click để chọn trang phục
        img.onclick = () => {
            if (category === 'skin'){
                selectSkin = (selectSkin === itemSrc) ? null : itemSrc;
            } else if(category === 'face'){
                selectFace = (selectFace === itemSrc) ? null : itemSrc;
            } else if (category === 'clothing') {
                selectClothing = (selectClothing === itemSrc) ? null : itemSrc;
            } else if(category === 'frontHair') {
                selectFrontHair = (selectFrontHair === itemSrc) ? null : itemSrc;
            } else if(category === 'backHair'){
                selectBackHair = (selectBackHair === itemSrc) ? null : itemSrc;
            } else if (category === 'accessories') {
                selectAccessories = (selectAccessories === itemSrc) ? null : itemSrc;
            } else if (category === 'foreground') {
                selectForeground = (selectForeground === itemSrc) ? null : itemSrc;
            }
            redrawCharacter();
        };

        // Sử dụng sự kiện dblclick để xóa lựa chọn
        img.ondblclick = () => {
            if (category === 'skin' && selectSkin === itemSrc){
                selectSkin = null;
            } else if (category === 'face' && selectClothing === itemSrc) {
                selectClothing = null;
            } else if (category === 'clothing' && selectClothing === itemSrc) {
                selectClothing = null;
            } else if(category === 'frontHair' && selectFrontHair === itemSrc) {
                selectFrontHair = null;
            } else if(category === 'backHair' && selectBackHair === itemSrc){
                selectBackHair = null;
            } else if (category === 'accessories' && selectAccessories === itemSrc) {
                selectAccessories = null;
            } else if (category === 'foreground' && selectForeground === itemSrc) {
                selectForeground = null;
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

// Thêm hàm để ẩn các menu trước khi hiển thị menu được chọn
function hideAllMenus() {
    const menus = document.querySelectorAll('.menu-container');
    menus.forEach(menu => {
        menu.classList.add('hidden');
    });
}

function selectCategory(category) {

    hideAllMenus(); // Ẩn tất cả các menu trước khi chọn

    const clothingMenu = document.getElementById('clothing-menu');
    clothingMenu.classList.remove('hidden');
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
        if (category === 'skin'){
            selectSkin = clothingItem;
        } else if (category === 'face'){
            selectFace = clothingItem;
        } else if (category === 'clothing'){
            selectClothing = clothingItem;
        } else if(category === 'frontHair'){
            selectFrontHair = clothingItem;
        } else if(category === 'backHair'){
            selectBackHair = clothingItem;
        } else if (category === 'accessories'){
            selectAccessories = clothingItem;
        } else if (category === 'foreground'){
            selectForeground = clothingItem;
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
        if(selectSkin){
            const skinImage = new Image();
            skinImage.src = selectSkin;
            skinImage.onload = () => {
                ctx.drawImage(skinImage, 0, 0, canvas.width, canvas.height);
            };
        }
        if (selectFace) {
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
        if (selectFrontHair) {
            const frontHairImage = new Image();
            frontHairImage.src = selectFrontHair;
            frontHairImage.onload = () => {
                ctx.drawImage(frontHairImage, 0, 0, canvas.width, canvas.height);
            };
        }
        if (selectBackHair) {
            const backHairImage = new Image();
            backHairImage.src = selectBackHair;
            backHairImage.onload = () => {
                ctx.drawImage(backHairImage, 0, 0, canvas.width, canvas.height);
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
        if(selectForeground) {
            const foregroundImage = new Image();
            foregroundImage.src = selectForeground;
            foregroundImage.onload = () => {
                ctx.drawImage(foregroundImage, 0, 0, canvas.width, canvas.height);
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
    selectSkin = null;
    selectFrontHair = null;
    selectBackHair = null;
    selectFace = null;
    selectClothing = null;
    selectAccessories = null;
    selectBackground = null;
    selectForeground = null;
}

document.addEventListener('DOMContentLoaded', function(){
    const clothingItem = document.querySelectorAll('.clothing-item');
    const defaultImage = document.getElementById('meme-loading');

    clothingItem.forEach(item => {
        item.addEventListener('click', function(){
            defaultImage.style.display = 'none';
        });
    });
})
window.onload = () => {
    loadCharacter();
};
