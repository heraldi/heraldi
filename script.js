// Variabel global
let scene, camera, renderer, heart, controls;
let isPaused = false;
let colorIndex = 0;
let smallHearts = [];
const pinkColors = [
    0xff69b4, // Hot Pink
    0xff1493, // Deep Pink
    0xffc0cb, // Light Pink
    0xffb6c1, // Light Pink 2
    0xff00ff, // Magenta
    0xda70d6  // Orchid
];

// Inisialisasi Three.js
function init() {
    // Buat scene
    scene = new THREE.Scene();
    
    // Buat kamera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Buat renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Tambahkan lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-1, -1, 2);
    scene.add(pointLight);
    
    // Buat bentuk love
    createHeart();
    
    // Buat love-love kecil yang mengitari
    createSmallHearts();
    
    // Tambahkan event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('wheel', onMouseWheel);
    
    // Touch events untuk mobile
    document.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    
    // Tambahkan kontrol tombol
    document.getElementById('pauseBtn').addEventListener('click', togglePause);
    document.getElementById('resetBtn').addEventListener('click', resetPosition);
    document.getElementById('colorBtn').addEventListener('click', changeColor);
    
    // Mulai animasi
    animate();
}

// Fungsi untuk membuat bentuk love 3D
function createHeart() {
    // Buat geometri love menggunakan parametric equation
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    
    // Extrude shape untuk membuat 3D
    const extrudeSettings = {
        depth: 0.8,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    };
    
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    
    // Buat material dengan warna pink dan efek glossy
    const material = new THREE.MeshPhongMaterial({
        color: pinkColors[colorIndex],
        specular: 0xffffff,
        shininess: 100,
        emissive: pinkColors[colorIndex],
        emissiveIntensity: 0.2
    });
    
    // Buat mesh
    heart = new THREE.Mesh(geometry, material);
    
    // Posisikan di tengah dengan rotasi yang benar
    heart.position.set(0, 0, 0);
    heart.rotation.x = Math.PI; // Putar 180 derajat untuk memperbaiki posisi
    
    // Tambahkan ke scene
    scene.add(heart);
    
    // Tambahkan partikel efek
    createParticles();
}

// Fungsi untuk membuat partikel efek
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: pinkColors[colorIndex],
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Simpan referensi untuk animasi
    heart.particles = particlesMesh;
}

// Fungsi untuk membuat love-love kecil yang mengitari
function createSmallHearts() {
    const heartCount = 24; // Jumlah love kecil (ditingkatkan dari 12 menjadi 24)
    
    for (let i = 0; i < heartCount; i++) {
        // Buat bentuk love kecil
        const smallHeartShape = new THREE.Shape();
        const x = 0, y = 0;
        smallHeartShape.moveTo(x + 0.5, y + 0.5);
        smallHeartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
        smallHeartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
        smallHeartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
        smallHeartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
        smallHeartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
        smallHeartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
        
        // Extrude shape untuk membuat 3D
        const extrudeSettings = {
            depth: 0.15, // Dikurangi dari 0.3 menjadi 0.15
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.02, // Dikurangi dari 0.05 menjadi 0.02
            bevelThickness: 0.02 // Dikurangi dari 0.05 menjadi 0.02
        };
        
        const smallHeartGeometry = new THREE.ExtrudeGeometry(smallHeartShape, extrudeSettings);
        
        // Material dengan warna pink yang berbeda-beda
        const randomColorIndex = Math.floor(Math.random() * pinkColors.length);
        const smallHeartMaterial = new THREE.MeshPhongMaterial({
            color: pinkColors[randomColorIndex],
            specular: 0xffffff,
            shininess: 100,
            emissive: pinkColors[randomColorIndex],
            emissiveIntensity: 0.3
        });
        
        // Buat mesh
        const smallHeart = new THREE.Mesh(smallHeartGeometry, smallHeartMaterial);
        
        // Skala agar lebih kecil (dari 0.15-0.25 menjadi 0.05-0.1)
        const scale = 0.05 + Math.random() * 0.05; // Ukuran bervariasi tapi lebih kecil
        smallHeart.scale.set(scale, scale, scale);
        
        // Posisikan dalam lingkaran mengelilingi love utama
        const angle = (i / heartCount) * Math.PI * 2;
        const radius = 2.2 + Math.random() * 0.8; // Jarak bervariasi
        const height = (Math.random() - 0.5) * 2.5; // Ketinggian bervariasi
        
        smallHeart.position.x = Math.cos(angle) * radius;
        smallHeart.position.y = height;
        smallHeart.position.z = Math.sin(angle) * radius;
        
        // Rotasi awal yang menghadap ke tengah
        smallHeart.rotation.y = -angle + Math.PI;
        smallHeart.rotation.x = Math.PI;
        
        // Simpan properti untuk animasi
        smallHeart.userData = {
            angle: angle,
            radius: radius,
            height: height,
            rotationSpeed: 0.01 + Math.random() * 0.02,
            floatSpeed: 0.001 + Math.random() * 0.002,
            floatAmount: 0.1 + Math.random() * 0.2
        };
        
        // Tambahkan ke scene
        scene.add(smallHeart);
        
        // Simpan dalam array
        smallHearts.push(smallHeart);
    }
}

// Fungsi animasi
function animate() {
    requestAnimationFrame(animate);
    
    if (!isPaused && heart) {
        // Rotasi love shape
        heart.rotation.x += 0.005;
        heart.rotation.y += 0.01;
        
        // Animasi floating
        heart.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        
        // Animasi pulsing
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
        heart.scale.set(scale, scale, scale);
        
        // Animasi partikel
        if (heart.particles) {
            heart.particles.rotation.y += 0.002;
            
            const positions = heart.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] = Math.sin(Date.now() * 0.001 + positions[i]) * 0.1;
            }
            heart.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animasi love-love kecil
        animateSmallHearts();
    }
    
    renderer.render(scene, camera);
}

// Fungsi untuk handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Variabel untuk mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Fungsi untuk handle mouse movement
function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    if (heart && !isPaused) {
        heart.rotation.y += targetX * 0.05;
        heart.rotation.x += targetY * 0.05;
    }
}

// Fungsi untuk handle mouse wheel (zoom)
function onMouseWheel(event) {
    event.preventDefault();
    
    const zoomSpeed = 0.1;
    if (event.deltaY < 0) {
        camera.position.z += zoomSpeed;
    } else {
        camera.position.z -= zoomSpeed;
    }
    
    // Batasi zoom
    camera.position.z = Math.max(2, Math.min(10, camera.position.z));
}

// Fungsi untuk toggle pause
function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? 'Resume Animasi' : 'Pause Animasi';
}

// Fungsi untuk reset posisi
function resetPosition() {
    camera.position.set(0, 0, 5);
    if (heart) {
        heart.rotation.set(Math.PI, 0, 0); // Reset dengan rotasi yang benar
        heart.position.set(0, 0, 0);
        heart.scale.set(1, 1, 1);
    }
}

// Variabel untuk touch interaction
let touchStartX = 0;
let touchStartY = 0;
let touchStartDistance = 0;
let isTouching = false;

// Fungsi untuk handle touch start
function onTouchStart(event) {
    event.preventDefault();
    isTouching = true;
    
    if (event.touches.length === 1) {
        // Single touch untuk rotasi
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    } else if (event.touches.length === 2) {
        // Two touch untuk zoom
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        touchStartDistance = Math.sqrt(dx * dx + dy * dy);
    }
}

// Fungsi untuk handle touch move
function onTouchMove(event) {
    event.preventDefault();
    
    if (!isTouching || !heart) return;
    
    if (event.touches.length === 1) {
        // Single touch untuk rotasi
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        // Rotasi berdasarkan pergerakan touch
        heart.rotation.y += deltaX * 0.01;
        heart.rotation.x += deltaY * 0.01;
        
        touchStartX = touchX;
        touchStartY = touchY;
    } else if (event.touches.length === 2) {
        // Two touch untuk zoom
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Zoom berdasarkan perubahan jarak
        const zoomSpeed = 0.01;
        const zoomDelta = (distance - touchStartDistance) * zoomSpeed;
        
        camera.position.z = Math.max(2, Math.min(10, camera.position.z - zoomDelta));
        
        touchStartDistance = distance;
    }
}

// Fungsi untuk handle touch end
function onTouchEnd(event) {
    isTouching = false;
}

// Fungsi untuk menganimasikan love-love kecil
function animateSmallHearts() {
    const time = Date.now() * 0.001;
    
    smallHearts.forEach((smallHeart, index) => {
        const userData = smallHeart.userData;
        
        // Rotasi mengelilingi love utama
        userData.angle += userData.rotationSpeed;
        
        // Posisi melingkar dengan floating
        smallHeart.position.x = Math.cos(userData.angle) * userData.radius;
        smallHeart.position.z = Math.sin(userData.angle) * userData.radius;
        smallHeart.position.y = userData.height + Math.sin(time * userData.floatSpeed + index) * userData.floatAmount;
        
        // Rotasi love kecil
        smallHeart.rotation.y += 0.02;
        smallHeart.rotation.x = Math.PI + Math.sin(time * 0.001 + index) * 0.1;
        
        // Selalu menghadap ke love utama
        smallHeart.lookAt(0, 0, 0);
    });
}

// Fungsi untuk mengubah warna
function changeColor() {
    colorIndex = (colorIndex + 1) % pinkColors.length;
    
    if (heart) {
        heart.material.color.set(pinkColors[colorIndex]);
        heart.material.emissive.set(pinkColors[colorIndex]);
        
        if (heart.particles) {
            heart.particles.material.color.set(pinkColors[colorIndex]);
        }
    }
    
    // Ubah warna love-love kecil juga
    smallHearts.forEach(smallHeart => {
        const randomColorIndex = Math.floor(Math.random() * pinkColors.length);
        smallHeart.material.color.set(pinkColors[randomColorIndex]);
        smallHeart.material.emissive.set(pinkColors[randomColorIndex]);
    });
}

// Jalankan inisialisasi saat halaman dimuat
window.addEventListener('load', init);