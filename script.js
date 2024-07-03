let baseCharacterImage;
let baseCharacterLoaded = false;
let selectHair = null;
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
        clothingItems = ['assets/clothing/hairs/shorthair.png','assets/clothing/hairs/longhair.png','assets/clothing/hairs/ponytailhair.png'];
    } else if (category === 'clothing') {
        clothingItems = ['assets/clothing/clothings/hoodie.png','assets/clothing/clothings/normal.png','assets/clothing/clothings/summer.png','assets/clothing/clothings/wedding.png','assets/clothing/clothings/winter.png'];
    } else if (category === 'accessories') {
        clothingItems = ['assets/clothing/accessories/strawhat.png'];
    }

    clothingItems.forEach(itemSrc => {
        const img = document.createElement('img');
        img.src = itemSrc;
        img.classList.add('clothing-item');
        img.onclick = () => applyClothing(itemSrc, category);
        clothingMenu.appendChild(img);
    });
}

function loadBackgroundOptions() {
    const clothingMenu = document.getElementById('clothing-menu');
    clothingMenu.innerHTML = '';

    const backgroundItems = ['assets/backgrounds/background1.png', 'assets/backgrounds/background2.png', 'assets/backgrounds/background3.png'];

    backgroundItems.forEach(itemSrc => {
        const img = document.createElement('img');
        img.src = itemSrc;
        img.classList.add('clothing-item');
        img.onclick = () => applyBackground(itemSrc);
        clothingMenu.appendChild(img);
    });
}

function selectCategory(category) {
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
        } else if (category === 'clothing'){
            selectClothing = clothingItem;
        } else if (category === 'accessories'){
            selectAccessories = clothingItem;
        }
        //Vẽ lại toàn bộ nhân vật với các mục đã chọn
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ lại
        ctx.drawImage(baseCharacterImage, 0, 0, canvas.width, canvas.height);

        if(selectHair){
            ctx.drawImage(selectHair, 0, 0, canvas.width, canvas.height);
        }
        if(selectClothing){
            ctx.drawImage(selectClothing, 0, 0, canvas.width, canvas.height);
        }
        if(selectAccessories){
            ctx.drawImage(selectAccessories, 0, 0, canvas.width, canvas.height);
        }
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
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ lại

        // Vẽ nền trước
        if (selectBackground) {
            ctx.drawImage(selectBackground, 0, 0, canvas.width, canvas.height);
        }

        // Vẽ nhân vật và các phụ kiện
        if (baseCharacterLoaded) {
            ctx.drawImage(baseCharacterImage, 0, 0, canvas.width, canvas.height);
            if (selectHair) {
                ctx.drawImage(selectHair, 0, 0, canvas.width, canvas.height);
            }
            if (selectClothing) {
                ctx.drawImage(selectClothing, 0, 0, canvas.width, canvas.height);
            }
            if (selectAccessories) {
                ctx.drawImage(selectAccessories, 0, 0, canvas.width, canvas.height);
            }
        }
    };
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

function shareCharacter() {
    // Chia sẻ hình ảnh của nhân vật
    alert('Tính năng chia sẻ chưa được triển khai.');
}

window.onload = () => {
    loadCharacter();
};
