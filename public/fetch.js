const tableBody = document.querySelector('#modelTable tbody');

function addModelToTable(modelName, modelId) {
    const row = document.createElement('tr');
    row.dataset._id = modelId;
    const nameCell = document.createElement('td');
    nameCell.textContent = modelName;

    const actionsCell = document.createElement('td');

    const viewButton = document.createElement('button');
    viewButton.classList.add('viewButton');
    viewButton.textContent = 'Просмотр';
    actionsCell.appendChild(viewButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'Удалить';
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(actionsCell);
    tableBody.appendChild(row);
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/db/models/');
        const models = await response.json();
        if (models.length === 0) {
            const noModelsRow = document.createElement('tr');
            const noModelsCell = document.createElement('td');
            noModelsCell.colSpan = 2;
            noModelsCell.textContent = 'No models found';
            noModelsRow.appendChild(noModelsCell);
            tableBody.appendChild(noModelsRow);
        } else {
            models.forEach(model => {
                addModelToTable(model.name, model._id);
            });
        }
    } catch (error) {
        console.error(error);
    }
});

tableBody.addEventListener('click', async function(event) {
    if (event.target.classList.contains('deleteButton')) {
        const row = event.target.closest('tr');
        const modelId = row.dataset._id;
        const apiKey = document.getElementById('apiKey').value;
        if (apiKey != ""){
            try {
                await fetch(`/db/models/${modelId}?apiKey=${apiKey}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                });
                tableBody.innerHTML = '';
                setTimeout(getMod, 100);
            } catch (error) {
                console.error(error);
            }
        }
    }
    if (event.target.classList.contains('viewButton')) {
        const row = event.target.closest('tr');
        const modelId = row.dataset._id;
        try{
            const response = await fetch(`/db/models/${modelId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            const model = await response.json();
            document.querySelector('#objectName').value = model.name;
            document.querySelector('#objectModelname').value = model.modelname;
            document.querySelector('#objectType').value = model.type;
            document.querySelector('#objectShape').value = model.object.form;
            document.querySelector('#objectSize').value = model.object.size;
            document.querySelector('#objectColor').value = model.object.color;
            document.querySelector('#objectOverview').value = model.overview;
            document.querySelector('#objectCommentary').value = model.comment;
            createForm.style.display = 'flex';
            createForm.style.flexDirection = 'column';
            threejs.style.display = 'flex';
            createShape(model.object.form, model.object.size, model.object.color);
        } 
        catch (error) {
            console.error(error);
        }
    }
});

function createShape(form, size, color) {
    const container = document.getElementById('threejs');

    // Удаляем все предыдущие объекты three.js из контейнера
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Устанавливаем размеры контейнера
    const width = 750; // Задайте нужную ширину
    const height = 375; // Задайте нужную высоту

    // Создаем сцену, камеру и рендерер
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Устанавливаем размеры рендерера
    renderer.setSize(width, height);

    // Добавляем рендерер в контейнер
    container.appendChild(renderer.domElement);

    // Добавляем пол
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Добавляем стенку сзади
    const wallGeometry = new THREE.PlaneGeometry(10, 5);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z = -5;
    wall.receiveShadow = true;
    scene.add(wall);
    // Добавляем освещение
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(5, 10, 5);
    light1.castShadow = true;
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-5, 10, 5);
    light2.castShadow = true;
    scene.add(light2);
    // Создание геометрии и материала в соответствии с переданными параметрами
    let geometry, material;
    if (form === 'cube') {
        geometry = new THREE.BoxGeometry(size, size, size);
    } else if (form === 'sphere') {
        geometry = new THREE.SphereGeometry(size, 32, 32);
    }
    material = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
    // Создание и добавление объекта в сцену
    const shape = new THREE.Mesh(geometry, material);
    shape.castShadow = true;
    scene.add(shape);
    // Настройка позиции и направления камеры
    camera.position.set(2, 2, 2); // Задайте нужные координаты позиции камеры
    camera.lookAt(shape.position); // Направляем камеру на объект
    function animate() {
        requestAnimationFrame(animate);
        // Корректировка позиции объекта на поверхности
        const raycaster = new THREE.Raycaster(shape.position, new THREE.Vector3(0, -1, 0));
        const intersects = raycaster.intersectObject(floor);
        if (intersects.length > 0) {
            shape.position.y = intersects[0].point.y + size / 1,5;
        }
        renderer.render(scene, camera);
    }
    animate();
}

refreshButton.addEventListener('click', async function() {
    try {
        tableBody.innerHTML = '';
        getMod()
    } catch (error) {
        console.error(error);
    }
});

async function getMod(){
    const response = await fetch('/db/models/');
        const models = await response.json();
        if (models.length === 0) {
            const noModelsRow = document.createElement('tr');
            const noModelsCell = document.createElement('td');
            noModelsCell.colSpan = 2;
            noModelsCell.textContent = 'No models found';
            noModelsRow.appendChild(noModelsCell);
            tableBody.appendChild(noModelsRow);
        } else {
            models.forEach(model => {
                addModelToTable(model.name, model._id);
            });
        }
}

createButton.addEventListener('click', function() {
    const apiKey = document.getElementById('apiKey').value;
    if (apiKey != ""){
        createForm.style.display = 'flex';
        createForm.style.flexDirection = 'column';
        threejs.style.display = 'flex';
    }
});

closeButton.addEventListener('click', function() {
    createForm.style.display = 'none';
    threejs.style.display = 'none';
});

document.getElementById('objectForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const apiKey = document.getElementById('apiKey').value;
    const objectName = document.getElementById('objectName').value;
    const objectModelname = document.getElementById('objectModelname').value;
    const objectType = document.getElementById('objectType').value;
    const objectShape = document.getElementById('objectShape').value;
    const objectSize = document.getElementById('objectSize').value;
    const objectColor = document.getElementById('objectColor').value;
    const objectOverview = document.getElementById('objectOverview').value;
    const objectCommentary = document.getElementById('objectCommentary').value;
    const data = {
        name: objectName,
        modelname: objectModelname,
        type: objectType,
        object: {
            form: objectShape,
            size: objectSize,
            color: objectColor
        },
        overview: objectOverview,
        comment: objectCommentary
    };
    try {
        const response = await fetch(`/db/models?apiKey=${apiKey}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Объект успешно добавлен в базу данных');
            document.getElementById('objectForm').reset();
        } else {
            console.error('Ошибка при добавлении объекта в базу данных');
        }
    } catch (error) {
        console.error(error);
    }
});