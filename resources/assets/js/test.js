import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { WEBGL } from './three/webTest';
import {DirectGeometry, MeshBasicMaterial, MeshStandardMaterial} from "three";

/* Создаем сцену */
const container = document.querySelector('#scene_container');
let scene;
let light = {
    'directLight': null,
    'lightAmb': null,
    'sphereLight': null,
};
let camera = {
    'camera': null,
    'controls': {
        'view': null,
        'game': {
            'control': null,
            'param': {
                'objects': null,
                'raycaster': null,
                'prevTime': performance.now(),
                'velocity': new THREE.Vector3(),
                'direction': new THREE.Vector3(),
                'moveForward': false,
                'moveBackward': false,
                'moveLeft': false,
                'moveRight': false,
                'canJump': false
            },
        }
    },
}
let mesh;
let renderer;
let raycaster = {
    'cast': null,
    'mouse': null,
    'func' :null
};

function modelInit() {

    scene = new THREE.Scene();
}

function modelLight() {

    function room_lightes() {

        // --> Прямой источник света
        function direct() {
            light.directLight = new THREE.DirectionalLight(0xffffff, 5.0);
            light.directLight.position.set(1, 10, 10);
        }

        // --> Окружающий источник света
        function amb() {
            light.lightAmb = new THREE.AmbientLight(0xffffff, 0.8);
            light.lightAmb.position.set(0, 2.7, 0);
            scene.add(light.lightAmb);
        }

        // --> Сферический источник света
        function sphere() {
            light.sphereLight = new THREE.HemisphereLight(
                0xddeeff,
                0x202020,
                5,
            );
            light.sphereLight.position.set(5, 10, 5);
        }

        // --> Прямоуголный источник света
        function area() {
            let width = 3.2;
            let height = 2.33;
            let intensity = 8;

            RectAreaLightUniformsLib.init();
            let rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
            rectLight.position.set(5.5, 1.85, -2.05);
            rectLight.rotation.y = THREE.Math.degToRad(90);
            scene.add(rectLight);

            var rectLightMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshStandardMaterial({
                color: 0xefedfe,
                side: THREE.BackSide,
                emissive: 0xd5d4e2,
            }));
            rectLightMesh.scale.x = rectLight.width;
            rectLightMesh.scale.y = rectLight.height;
            rectLight.add(rectLightMesh);
        }

        // --> Прожекторный свет
        function spots() {
            let spotblue_intensity = 6.7;
            var spotLight_blue = new THREE.SpotLight(0x73b0ed, spotblue_intensity);
            spotLight_blue.position.set(-5.46, 3.555, -4.2);
            scene.add(spotLight_blue);

            var spotLight_blueMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial());
            spotLight_blue.add(spotLight_blueMesh);

            let spotpink_intensity = 4;
            var spotLight_pink = new THREE.SpotLight(0xffdcfd, spotpink_intensity);
            spotLight_pink.position.set(4.545, 3.43, 4.57);
            spotLight_pink.rotation.y = THREE.Math.degToRad(60);
            scene.add(spotLight_pink);

            var spotLight_pinkMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial());
            spotLight_pink.add(spotLight_pinkMesh);
        }

        amb();
        direct();
        sphere();
        area();
        spots();
    }
    function test_lightes() {

        // Light - основной базовый абстрактный класс, не испольузуется напрямую, его наследуют все источники света.
        // Свойства: color - цвет источника,
        // intensive - интенсивность источника
        // Методы: .copy() - сюда вставлять экземпляр другого источника и так скопируются его значений.
        // .toJSON() - получаем в json все данные и значений передоваемого сюда истониуа света


        // Это окружающий одномерный свет без направление (GI, но одномерный)
        let ambientlight1 = new THREE.AmbientLight(0xc994e8, 10);
        let ambientlight2 = new THREE.AmbientLight(0x666666, 20);
        let new_light = ambientlight2.toJSON(ambientlight1);

        // Это свет во все стороны, но с бесконечными прямоленейными лучами что не будут рассеяваться с растоянием (не дает GI).
        // -- Он создает тень (пример как планета затеняется).
        // -- Это предпологается как далекий источник света как солнце, луна.
        // -- Пример солнце, луна так светить,
        // -- Может лампочка, но не в помещений так как он должен сделать GI (в таком лучае необходимо дополнительно добавить др источники света с GI)
        var directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.castShadow = true;
        directionalLight.position.set(0,6,4);
        var helper = new THREE.CameraHelper( directionalLight.shadow.camera );
        //scene.add( helper );
        var directionalLightMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial());
        directionalLight.add(directionalLightMesh);

        // Это свет похожий на directionalLight, но с GI и с 2 точками
        // -- Есть 2 точки вверх(небо) и вниз(земля) куда вставляются цвета. Этим добивается реализм, к примеру рядом с источником свет яркий, а в земле уже темный и отадаляесь становиться темнее.
        var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 12);
        hemisphereLight.position.set(0,6,12);
        var hemisphereLightMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial());
        hemisphereLight.add(hemisphereLightMesh);

        // Это свет точещнего источника, с направлением во все стороны. Пример лапочка в комнате, святлички.
        var pointLight = new THREE.PointLight(0xffffff, 1, 10, 2);
        pointLight.position.set(18,4,3);
        pointLight.power = 600; // intensive деалем 1 и даем интенсивность мощностью лампы в люменах. Люмены можно глянуть в лампах.
        pointLight.castShadow = true;

        pointLight.shadow.mapSize.width = 1024;  // default
        pointLight.shadow.mapSize.height = 1024; // default
        pointLight.shadow.camera.near = 0.5;       // default
        pointLight.shadow.camera.far = 512;     // default

        var pointLightMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial());
        pointLight.add(pointLightMesh);

        // Квадратный источник света - аналог как в vray квадрат в 3dmax
        RectAreaLightUniformsLib.init();
        var width = 6;
        var height = 6;
        var intensity = 6;
        var rectLight = new THREE.RectAreaLight(0xffffff, intensity,  width, height);
        rectLight.position.set(18,6,3);
        rectLight.rotation.x = THREE.Math.degToRad(-30);
        let rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);

        // Прожекторный источник света
        var targetObject = new THREE.Object3D();
        targetObject.position.set(40,0,6);
        scene.add(targetObject);

        var spotLight = new THREE.SpotLight(0xffffff, 1, 50, THREE.Math.degToRad(30), 0.1, 2);
        spotLight.power = 2000;
        spotLight.position.set(20,6,3);
        spotLight.target = targetObject; // Задаем цель прицелу источника. Теперь он будет следить за ним и поворачиваться туда где стоит цель.
        scene.add(spotLight.target);

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024; // Высота и ширина тени. Создаем саму тень, меншьше значений края тени квадратные
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 0.5;
        spotLight.shadow.camera.far = 512;
        spotLight.shadow.camera.fov = 30;

        scene.add(spotLight);
    }

    room_lightes();
    test_lightes();
}

let first_init = true;
function modelCamera(type_camera) {

    const fov = 50;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 100;
    camera.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Контролы камеры
    function view_camera() {

        // Задаем контроллер камеры
        camera.controls.view = new OrbitControls(camera.camera, container);

        // Положение камеры
        camera.camera.position.set(0, 12, 7);
        camera.camera.rotation.x = THREE.Math.degToRad(-50);
    }

    function game_camera() {
        // Задаем контроллер камеры
        camera.controls.game.control = new PointerLockControls(camera.camera, container);

        // Положение камеры
        camera.camera.position.set(-3, 1.5, 1);
        camera.camera.rotation.y = THREE.Math.degToRad(-70);

        if(first_init) {
            camera.controls.game.control.lock();
            first_init = false;
        }
        container.addEventListener('click', function () {
            camera.controls.game.control.lock();
        },false);

        scene.add(camera.controls.game.control.getObject());

        // Задаем управление
        var onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    camera.controls.game.param.moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    camera.controls.game.param.moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    camera.controls.game.param.moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    camera.controls.game.param.moveRight = true;
                    break;

                /*case 32: // space
                    if (camera.controls.game.param.canJump === true) {
                        camera.controls.game.param.velocity.y += 100;
                    }
                    camera.controls.game.param.canJump = false;
                    break;*/
            }
        };

        var onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    camera.controls.game.param.moveForward = false;
                    break;

                case 37: // left
                case 65: // a
                    camera.controls.game.param.moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    camera.controls.game.param.moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    camera.controls.game.param.moveRight = false;
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    }

    if(type_camera == 'view') {
        view_camera();
    } else if(type_camera == 'game') {
        game_camera();
    }
}

function print_scene() {

    // Packages
    class Libs {

        constructor(who, pick) {
            this.who = who;
            this.pick = pick;
            this.setmaterial = function (map, material_type) {
                const onError = (error) => {
                    console.log(error);
                };

                let textureLoader = new THREE.TextureLoader();

                let color = 0xffffff;
                if(typeof map['color'] !== "undefined") {
                    color = map['color'];
                }

                let bitmap = null;
                if(typeof map['map'] !== "undefined") {
                    bitmap = textureLoader.load(map.map, undefined, undefined, error => onError(error));
                    bitmap.encoding = THREE.sRGBEncoding;
                    bitmap.anisotropy = 8; // Четкость
                    bitmap.flipY = false;
                }

                let alphamap = null;
                if(typeof map['alphamap'] !== "undefined") {
                    alphamap = textureLoader.load(map.alphamap, undefined, undefined, error => onError(error));
                    alphamap.anisotropy = 8;
                }

                let aomap = null; // [Реализм] Симуляция затение. Указываем где затениние хорошо идет, где слабо (где свет блокируется поверхностью объекта). Через aoMapIntensity задаем интенсивность
                if(typeof map['aomap'] !== "undefined") {
                    aomap = textureLoader.load(map.aomap, undefined, undefined, error => onError(error));
                    aomap.format = THREE.AlphaFormat;
                    aomap.anisotropy = 8;
                    aomap.flipY = false;
                }

                let bumpmap = null; // [Реализм] Это карта рельефа работает только на освещение. Как в максе задает шереховатость поверхности. bumpScale указывает интенсивность
                if(typeof map['bumpmap'] !== "undefined") {
                    bumpmap = textureLoader.load(map.bumpmap, undefined, undefined, error => onError(error));
                    bumpmap.encoding = THREE.AlphaFormat;
                    bumpmap.anisotropy = 8;
                    bumpmap.flipY = false;
                }

                let displacementmap = null; // Это displacement как в максе, действует на геометрию моделя. С ним я рисовал траву, жрет он много.
                if(typeof map['displacementmap'] !== "undefined") {
                    displacementmap = textureLoader.load(map.displacementmap, undefined, undefined, error => onError(error));
                    displacementmap.encoding = THREE.AlphaFormat;
                    displacementmap.anisotropy = 8; // Четкость
                    displacementmap.flipY = false;
                }

                let emissive = 0x000000;
                if(typeof map['emissive'] !== "undefined") {
                    emissive = map.emissive;
                }

                let emissivemap = null; // Самосветящаяся карта.
                if(typeof map['emissivemap'] !== "undefined") {
                    emissivemap = textureLoader.load(map.emissivemap, undefined, undefined, error => onError(error));
                    emissivemap.encoding = THREE.sRGBEncoding;
                    emissivemap.anisotropy = 8; // Четкость
                    emissivemap.flipY = false;
                }

                let envmap = null
                if(typeof map['envmap'] !== "undefined") {
                    envmap = textureLoader.load(map.envmap, undefined, undefined, error => onError(error));
                    envmap.encoding = THREE.sRGBEncoding;
                    envmap.anisotropy = 8; // Четкость
                    envmap.flipY = false;
                }

                let lightmap = null; // [Реализм] Симуляция освещенности поверхности. Указываем где освещение хорошо идет, где слабо. Через lightMapIntensity задаем интенсивность
                if(typeof map['lightmap'] !== "undefined") {
                    lightmap = textureLoader.load(map.lightmap, undefined, undefined, error => onError(error));
                    lightmap.encoding = THREE.sRGBEncoding;
                    lightmap.anisotropy = 8; // Четкость
                    lightmap.flipY = false;
                }

                let roughness = 1; // Уровень шереховатестей поверхностя. Он зеркально гладкий, хорошо отражает свет или расеянный.
                if(typeof map['roughness'] !== "undefined") {
                    roughness = map.roughness;
                }

                let roughnessmap = null;
                if(typeof map['roughnessmap'] !== "undefined") {
                    roughnessmap = textureLoader.load(map.roughnessmap, undefined, undefined, error => onError(error));
                    roughnessmap.encoding = THREE.AlphaFormat;
                    roughnessmap.anisotropy = 8; // Четкость
                    roughnessmap.flipY = false;
                }

                let refractionratio = 0.98; // Уровень IOR
                if(typeof map['refractionratio'] !== "undefined") {
                    refractionratio = map.refractionratio;
                }

                let metalness = 0; // Уровень металичности материала. Применяем его если у нас есть метал.
                if(typeof map['metalness'] !== "undefined") {
                    metalness = map.metalness; // Нужен EquirectangularReflectionMapping
                }

                let metalnessmap = null; // Уровень металичности материала. Применяем его если у нас есть метал.
                if(typeof map['metalnessmap'] !== "undefined") {
                    metalnessmap = textureLoader.load(map.metalnessmap, undefined, undefined, error => onError(error));
                    metalnessmap.encoding = THREE.sRGBEncoding;
                    metalnessmap.anisotropy = 8; // Четкость
                    metalnessmap.flipY = false;
                }

                let specular = 0x111111;
                if(typeof map['specular'] !== "undefined") {
                    specular = map.specular;
                }

                let specularmap = null;
                if(typeof map['specularmap'] !== "undefined") {
                    specularmap = textureLoader.load(map.specularmap, undefined, undefined, error => onError(error));
                    specularmap.encoding = THREE.sRGBEncoding;
                    specularmap.anisotropy = 8; // Четкость
                    specularmap.flipY = false;
                }

                let matcap = null;
                if(typeof map['matcap'] !== "undefined") {
                    matcap = textureLoader.load(map.matcap, undefined, undefined, error => onError(error));
                    matcap.encoding = THREE.sRGBEncoding;
                    matcap.anisotropy = 8;
                }

                // [full] [react-light] Cтандартный материал для большинство сцен
                if(material_type == 'standard') {
                    return new THREE.MeshStandardMaterial({
                        color: color,
                        map: bitmap,
                        aoMap: aomap,
                        aoMapIntensity: 1,
                        alphaMap: alphamap,
                        bumpMap: bumpmap,
                        bumpScale: 0.037,
                        displacementMap: displacementmap,
                        displacementScale: 0.1,
                        displacementBias: 0,
                        emissive: emissive,
                        emissiveMap: emissivemap,
                        emissiveIntensity: 1,
                        envMap: envmap,
                        lightMap: lightmap,
                        lightMapIntensity: 1,
                        roughness: roughness,
                        roughnessMap: roughnessmap,
                        refractionRatio: refractionratio,
                        metalness: metalness,
                        metalnessMap: metalnessmap
                    });
                    // [mini] [NO-react-light] Упращенный базовый материал не реагирующий на цвет. Подходит для теста и для простых сцен (возможно еще на элементы в заднем плане)
                } else if(material_type == 'pong') {
                    return new THREE.MeshPhongMaterial({
                        color: color,
                        map: bitmap,
                        aoMap: aomap,
                        aoMapIntensity: 1,
                        alphaMap: alphamap,
                        bumpMap: bumpmap,
                        bumpScale: 0.037,
                        displacementMap: displacementmap,
                        displacementScale: 0.1,
                        displacementBias: 0,
                        emissive: emissive,
                        emissiveMap: emissivemap,
                        emissiveIntensity: 1,
                        envMap: envmap,
                        lightMap: lightmap,
                        lightMapIntensity: 1,
                        reflectivity: 1, // отражательность
                        shininess: 60, // сила блеска
                        specular: specular, // цвет блеска
                        specularMap: specularmap,
                        refractionRatio: refractionratio
                    });
                    // [full] [react-light] Материал для матовых, шероховатых (камень, грубое дерево и так далее) поверхностей. Полный материал как Standard. Берет меншьше вычеслительной мощностий
                } else if(material_type == 'lambert') {
                    return new THREE.MeshLambertMaterial({
                        color: color,
                        map: bitmap,
                        aoMap: aomap,
                        aoMapIntensity: 1,
                        emissive: emissive,
                        emissiveMap: emissivemap,
                        emissiveIntensity: 1,
                        lightMap: lightmap,
                        lightMapIntensity: 1,
                        refractionRatio: refractionratio,
                        specularMap: specularmap
                    });
                } else if(material_type == 'physical') {
                    return new THREE.MeshPhysicalMaterial({
                        color: color,
                        map: bitmap,
                        aoMap: aomap,
                        aoMapIntensity: 1,
                        alphaMap: alphamap,
                        bumpMap: bumpmap,
                        bumpScale: 0.037,
                        displacementMap: displacementmap,
                        displacementScale: 0.1,
                        displacementBias: 0,
                        emissive: emissive,
                        emissiveMap: emissivemap,
                        emissiveIntensity: 1,
                        envMap: envmap,
                        lightMap: lightmap,
                        lightMapIntensity: 1,
                        roughness: roughness,
                        roughnessMap: roughnessmap,
                        refractionRatio: refractionratio,
                        metalness: metalness,
                        metalnessMap: metalnessmap,

                        clearcoat: 0.4,
                        clearcoatRoughness: 0.98,
                        reflectivity: 1,
                    });
                }
            }
        }

        init() {
            if(this.who == 'model') {
                return this._model();
            } else if(this.who == 'light') {
                return this._light();
            }
        }

        _model() {
            let geometry, roll_m, mesh_m;
            if(this.pick == 'cube_brick') {
                geometry = new THREE.BoxBufferGeometry(2, 2, 2);
                roll_m = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true });
                let textures = {
                    'map': 'models/textures/brick/map.jpg',
                    'alphamap': 'models/textures/brick/alphamap.jpg',
                    'bumpmap': 'models/textures/brick/bumpmap.jpg',
                    'aomap': 'models/textures/brick/aomap.jpg',
                    'emissivemap': 'models/textures/brick/emissivemap.jpg',
                    'lightmap': 'models/textures/brick/lightmap.jpg',
                    'roughnessmap': 'models/textures/brick/roughnessmap.jpg',
                    'metalnessmap': 'models/textures/brick/metalnessmap.jpg',
                    'roughness': 0.6
                }
                mesh_m = this.setmaterial(textures, 'standard');
            } else if(this.pick == 'schere_plastic') {
                geometry = new THREE.IcosahedronBufferGeometry(2, 3);
                roll_m = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true });

                let textures = {
                    'color': 0xff0000,
                    'metalness': 0,
                    'roughness': 0.8
                }
                mesh_m = this.setmaterial(textures, 'standard');
            }
            if(this.pick !== undefined) {
                return {
                    'roll': new THREE.Mesh(geometry, roll_m),
                    'mesh': new THREE.Mesh(geometry, mesh_m)
                }
            }
        }

        _light() {
        }
    }
    class Insert {

        constructor(picking, objects) {
            this.picking = picking;
            this.objects = objects;

            this.raycaster = {
                'caster': this.raycaster = new THREE.Raycaster(),
                'mouse': this.mouse = new THREE.Vector2()
            }
            this.events = {
                'onDocumentMouseMove': null,
                'onDocumentMouseDown': null,
            }
        }

        _events() {
            let objects = this.objects;
            let raycaster = this.raycaster.caster;
            let mouse = this.raycaster.mouse;
            let roll = this.picking.roll;
            let mesh = this.picking.mesh;
            let insert = this._insert;
            let events = this.events;

            this.events.onDocumentMouseMove = function onDocumentMouseMove(event) {
                event.preventDefault();
                mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
                raycaster.setFromCamera(mouse, camera.camera);

                let intersects = raycaster.intersectObjects(objects);
                if (intersects.length > 0) {
                    let intersect = intersects[0];
                    roll.position.copy(intersect.point).add(intersect.face.normal);
                }
            }

            this.events.onDocumentMouseDown = function onDocumentMouseDown(event) {
                event.preventDefault();
                if(event.which == 3) {

                    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
                    raycaster.setFromCamera(mouse, camera.camera);

                    var intersects = raycaster.intersectObjects(objects);
                    if (intersects.length > 0) {
                        var intersect = intersects[0];

                        mesh.position.copy(intersect.point).add(intersect.face.normal);
                        insert(mesh, roll, events);
                    }
                }
            }

            document.addEventListener('mousemove', this.events.onDocumentMouseMove, false);
            document.addEventListener('mousedown', this.events.onDocumentMouseDown, false);
        }

        init() {
            this.picking.roll.position.set(camera.camera.getWorldDirection());
            scene.add(this.picking.roll);
            this._events();
        }

        _insert(mesh, roll, events) {

            scene.add(mesh);
            objects.push(mesh);

            scene.remove(roll);
            document.removeEventListener('mousemove', events.onDocumentMouseMove, false);
            document.removeEventListener('mousedown', events.onDocumentMouseDown, false);
        }
    }
    class Drag {

        constructor(objects) {
            this.transform = new TransformControls(camera.camera, renderer.domElement);
            this.drag = new DragControls(objects, camera.camera, renderer.domElement );
        }

        init() {
            this.transform.setMode("translate");
            this.transform.addEventListener('dragging-changed', function (event) {
                camera.controls.view.enabled = !event.value
            });

            let transform = this.transform;
            this.drag.enabled = false;
            this.drag.addEventListener('dragstart', function (event) {
                if(event.object.name != 'dummy') {
                    transform.attach(event.object);
                    scene.add(transform);
                }
            });
        }

        destroy() {
            this.transform.detach();
        }
    }

    // Start
    let objects = [];

    let plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000 ); plane_geo.rotateX(- Math.PI / 2);
    let plane = new THREE.Mesh(plane_geo, new THREE.MeshBasicMaterial({ visible: false })); plane.name = 'dummy';
    scene.add(plane);
    objects.push(plane);

    let drag = new Drag(objects);

    $('.js_print_add').click(function () {
        let libs = new Libs('model', $(this).data('id'));
        let picking = libs.init();

        let model = new Insert(picking, objects);
        model.init();

        drag.init(objects);
    });

    /* ----------------- */
    let draw_objects = [];

    let draw_drag = new Drag(draw_objects);
    draw_drag.spline_listener = function () {

        let line = this.line;
        this.transform.addEventListener('objectChange', function (event) {

            let shape = new THREE.Shape();
            for(let d in draw_objects) {
                shape.lineTo(draw_objects[d].position.x, draw_objects[d].position.z);
            }
            console.log(shape);
            let curve = shape.getPoints();
            line.geometry.setFromPoints(curve);
        });
    };

    $('.js_draw').click(function () {

        function create() {
            let box_g = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
            let box_m = new THREE.MeshBasicMaterial({ color: 0x666666 });

            let shape = new THREE.Shape();
            let points = 4;
            for(let i = 1; i <= points; i++) {

                // create cubes and line
                let mesh = new THREE.Mesh(box_g, box_m);
                if(i == 0) {
                    mesh.position.set(0, 0, 0);
                } else if(i == 1) {
                    mesh.position.set(0, 0, 1);
                } else if(i == 2) {
                    mesh.position.set(1, 0, 1);
                } else if(i == 3) {
                    mesh.position.set(1, 0, 0);
                }
                shape.lineTo(mesh.position.x, mesh.position.z);

                scene.add(mesh);
                draw_objects.push(mesh);
            }
            console.log(shape);

            let curve = shape.getPoints();
            var geometry = new THREE.BufferGeometry().setFromPoints(curve);
            var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
            var line = new THREE.Line(geometry, material);
            line.rotation.x = THREE.MathUtils.degToRad(90);

            scene.add(line);

            draw_drag.line = line;
            draw_drag.init();
            draw_drag.spline_listener();
        }

        create();
    });

    document.addEventListener('keydown', function (event) {
        if(event.keyCode == 27) {
            drag.destroy();
            draw_drag.destroy();
        }
    }, false);
}

function modelRender() {

    renderer = new THREE.WebGLRenderer({antialias: true}); // antialias - сглаживания

    // Физическое правильное освещение
    renderer.physicallyCorrectLights = true;

    // Кодировка цвета
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Гамма. Настраиваем гамму коррекцию видимой для глаз
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    // Установить холст рендера такой же как и размер камеры и блока
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Соотношение пикселей для мобилок, чтоб изображение не было мыльной
    renderer.setPixelRatio(window.devicePixelRatio);

    // Test
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // Положить canvas в наш блок
    container.appendChild(renderer.domElement);
}

function play(type_camera) {

    modelInit();
    modelRender();
    modelLight();
    modelCamera(type_camera);
    print_scene();

    // Этот метод лучше. Он рабоатет и обычном браузере и VR
    renderer.setAnimationLoop(() => {

        function game_controlls() {

            let controls = camera.controls.game.control;
            if (controls !== null && controls.isLocked === true) {

                function calc_coordinates() {
                    let param = camera.controls.game.param;

                    // Устанавливаем время. Он нужен для арифметических расчетов при установке кординат
                    let time = performance.now();
                    let delta = (time - param.prevTime) / 1000;

                    // Задаем кординату в пространстве
                    param.velocity.x -= param.velocity.x * 10.0 * delta;
                    param.velocity.z -= param.velocity.z * 10.0 * delta;

                    // Получаем навравлений движение - какая кнопка направлений было нажата, по нему будем узнавать куда двигаться
                    param.direction.z = Number(param.moveForward) - Number(param.moveBackward);
                    param.direction.x = Number(param.moveRight) - Number(param.moveLeft);
                    param.direction.normalize();

                    // Устанавливаем новую кординату в сооветствий направлению
                    let speed = 40.0;
                    if (param.moveForward || param.moveBackward) {
                        param.velocity.z -= param.direction.z * speed * delta;
                    }
                    if (param.moveLeft || param.moveRight) {
                        param.velocity.x -= param.direction.x * speed * delta;
                    }
                    param.prevTime = time;

                    return {
                        'delta': delta,
                        'coordinateX': param.velocity.x,
                        'coordinateZ': param.velocity.z,
                    };
                }

                let calc = calc_coordinates();
                controls.moveRight(- calc.coordinateX * calc.delta);
                controls.moveForward(- calc.coordinateZ * calc.delta);
            }
        }

        game_controlls();
        renderer.render(scene, camera.camera);
    })
}
function stop() {
    renderer.setAnimationLoop(null);
}

/* ----------------------------- */

/* Проверка совместимости браузера [обязательно] */
if (WEBGL.isWebGLAvailable()) {

    $('.scene_method button').click(function (e) {

        play($(e.target).data('type'));

        setTimeout(function () {
            $('.scene_method').addClass('none');
            $('#scene_container').addClass('active');
        },200);
    });
} else {

    console.log('Не поддерживается!');
}

/* Изминение окна браузера - detect и обновление камеры и рендера */
function onWindowREsize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}
window.addEventListener('resize', onWindowREsize);
