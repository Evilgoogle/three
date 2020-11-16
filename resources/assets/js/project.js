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

    // Прямая текстура. Обычная
    //let textureLoader = new THREE.TextureLoader();
    //var map = textureLoader.load('/models/textures/brick/map.jpg', undefined, undefined, error => onError(error));
    //map.anisotropy = 8;

    // Cоздаеться куб. Подходитт для env
    /*var loader = new THREE.CubeTextureLoader();
    loader.setPath( '/models/textures/brick/' );
    var map = loader.load( [
        'map.jpg', 'map.jpg',
        'map.jpg', 'map.jpg',
        'map.jpg', 'map.jpg'
    ] );

    scene.background = map;*/

    //scene.background = new THREE.Color('skyblue');
    //scene.fog = new THREE.Fog(0x666666, 1, 60); // Туман которая будет усиливаться с растоянием. Задаем растояние по нему будет работать туман
    //scene.fog = new THREE.FogExp2(0x666666, 0.2); // Этот туман зависит от камеры. Задаем плотность тумана. Подходит для игр.
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

function modelObjects() {

    const geometry = function() {
        let sphere = new THREE.SphereBufferGeometry(1.5, 48, 48);

        let test = new THREE.BufferGeometry();
        var test_vertices = new Float32Array([
            0.0, 0.0, 0.0,
            2.0, 0.0, 0.0,
            2.0, 2.0, -1.0,

            0.0, 0.0, 0.0,
            2.0, 0.0, 0.0,
            2.0, 2.0, 1.0,
        ]);
        test.setAttribute('position', new THREE.BufferAttribute(test_vertices, 3));

        let geo_wood = sphere,
            geo_metal = sphere,
            geo_brick = sphere,
            geo_jeans = sphere,
            geo_asphalt = sphere,
            geo_laminat = sphere,
            geo_pic = sphere,
            geo_granite = sphere;

        return [plane, geo_wood, geo_metal, geo_brick, geo_jeans, geo_asphalt, geo_laminat, geo_pic, geo_granite, test];
    }

    const material = function() {
        let setcolor = function(color) {
            return new THREE.MeshStandardMaterial({ color: color });
        }

        let setmaterial = function (map, material_type) {
            if(material_type === undefined) {
                material_type = 'standart';
            }

            const onError = (error) => {
                console.log(error);
            };

            let textureLoader = new THREE.TextureLoader();

            let color = null;
            if(typeof map['color'] !== "undefined") {
                color = map['color'];
            }

            let bitmap = null;
            if(typeof map['map'] !== "undefined") {
                bitmap = textureLoader.load(map.map, undefined, undefined, error => onError(error));
                bitmap.encoding = THREE.sRGBEncoding;
                bitmap.flipY = false;
                bitmap.wrapS = THREE.RepeatWrapping;
                bitmap.wrapT = THREE.RepeatWrapping;
                bitmap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                bitmap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                bitmap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                bitmap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                bitmap.anisotropy = 8; // Четкость
                bitmap.rotation = 0; // Вращяем текстуру (искривление)
            }

            let alphamap = null;
            if(typeof map['alphamap'] !== "undefined") {
                alphamap = textureLoader.load(map.alphamap, undefined, undefined, error => onError(error));
                alphamap.anisotropy = 8;
                alphamap.format = THREE.AlphaFormat;
                alphamap.wrapS = THREE.RepeatWrapping;
                alphamap.wrapT = THREE.RepeatWrapping;
                alphamap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                alphamap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                alphamap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                alphamap.repeat.set(2, 2); // Кол-во повторений (как в максе)
            }

            let aomap = null; // [Реализм] Симуляция затение. Указываем где затениние хорошо идет, где слабо (где свет блокируется поверхностью объекта). Через aoMapIntensity задаем интенсивность
            if(typeof map['aomap'] !== "undefined") {
                aomap = textureLoader.load(map.aomap, undefined, undefined, error => onError(error));
                aomap.anisotropy = 8;
                aomap.flipY = false;
                aomap.format = THREE.AlphaFormat;
                aomap.wrapS = THREE.RepeatWrapping;
                aomap.wrapT = THREE.RepeatWrapping;
                aomap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                aomap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                aomap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                aomap.repeat.set(2, 2); // Кол-во повторений (как в максе)
            }

            let bumpmap = null; // [Реализм] Это карта рельефа работает только на освещение. Как в максе задает шереховатость поверхности. bumpScale указывает интенсивность
            if(typeof map['bumpmap'] !== "undefined") {
                bumpmap = textureLoader.load(map.bumpmap, undefined, undefined, error => onError(error));
                bumpmap.encoding = THREE.AlphaFormat;
                bumpmap.flipY = false;
                bumpmap.wrapS = THREE.RepeatWrapping;
                bumpmap.wrapT = THREE.RepeatWrapping;
                bumpmap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                bumpmap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                bumpmap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                bumpmap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                bumpmap.anisotropy = 8; // Четкость
            }

            let displacementmap = null; // Это displacement как в максе, действует на геометрию моделя. С ним я рисовал траву, жрет он много.
            if(typeof map['displacementmap'] !== "undefined") {
                displacementmap = textureLoader.load(map.displacementmap, undefined, undefined, error => onError(error));
                displacementmap.encoding = THREE.AlphaFormat;
                displacementmap.wrapS = THREE.RepeatWrapping;
                displacementmap.wrapT = THREE.RepeatWrapping;
                displacementmap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                displacementmap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                displacementmap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                displacementmap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                displacementmap.anisotropy = 8; // Четкость
            }

            let emissive = 0x000000;
            if(typeof map['emissive'] !== "undefined") {
                emissive = map.emissive;
            }

            let emissivemap = null; // Самосветящаяся карта.
            if(typeof map['emissivemap'] !== "undefined") {
                emissivemap = textureLoader.load(map.emissivemap, undefined, undefined, error => onError(error));
                emissivemap.encoding = THREE.sRGBEncoding;
                emissivemap.flipY = false;
                emissivemap.wrapS = THREE.RepeatWrapping;
                emissivemap.wrapT = THREE.RepeatWrapping;
                emissivemap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                emissivemap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                emissivemap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                emissivemap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                emissivemap.anisotropy = 8; // Четкость
            }

            let envmap = null
            if(typeof map['envmap'] !== "undefined") {
                envmap = textureLoader.load(map.envmap, undefined, undefined, error => onError(error));
                envmap.encoding = THREE.sRGBEncoding;
                envmap.flipY = false;
                envmap.wrapS = THREE.RepeatWrapping;
                envmap.wrapT = THREE.RepeatWrapping;
                envmap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                envmap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                envmap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                envmap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                envmap.anisotropy = 8; // Четкость
            }

            let lightmap = null; // [Реализм] Симуляция освещенности поверхности. Указываем где освещение хорошо идет, где слабо. Через lightMapIntensity задаем интенсивность
            if(typeof map['lightmap'] !== "undefined") {
                lightmap = textureLoader.load(map.lightmap, undefined, undefined, error => onError(error));
                lightmap.encoding = THREE.sRGBEncoding;
                lightmap.flipY = false;
                lightmap.wrapS = THREE.RepeatWrapping;
                lightmap.wrapT = THREE.RepeatWrapping;
                lightmap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                lightmap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                lightmap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                lightmap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                lightmap.anisotropy = 8; // Четкость
            }

            let roughness = 1; // Уровень шереховатестей поверхностя. Он зеркально гладкий, хорошо отражает свет или расеянный.
            if(typeof map['roughness'] !== "undefined") {
                roughness = map.roughness;
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
                metalnessmap.flipY = false;
                metalnessmap.wrapS = THREE.RepeatWrapping;
                metalnessmap.wrapT = THREE.RepeatWrapping;
                metalnessmap.magFilter = THREE.LinearFilter; // ! Не понял в чем отличие
                metalnessmap.minFilter = THREE.LinearMipmapNearestFilter; // ! Не понял в чем отличие
                metalnessmap.offset.set(0, 0); // Смещяем текстуру (как в максе)
                metalnessmap.repeat.set(2, 2); // Кол-во повторений (как в максе)
                metalnessmap.anisotropy = 8; // Четкость
            }

            if(material_type == 'standart') {
                return new THREE.MeshStandardMaterial({
                    color: color,
                    map: bitmap,
                    aoMap: aomap,
                    aoMapIntensity: 0.7,
                    alphaMap: alphamap,
                    bumpMap: bumpmap,
                    bumpScale: 0.04,
                    //defines: {'STANDART': ''} --> выбор шефдеров рендера WebGLRenderer
                    //displacementMap: displacementmap,
                    displacementScale: 0.1,
                    displacementBias: 0,
                    emissive: emissive,
                    emissiveMap: emissivemap,
                    emissiveIntensity: 1,
                    //envMap: envmap
                    lightMap: lightmap,
                    lightMapIntensity: 1,
                    roughness: roughness,
                    refractionRatio: refractionratio,
                    metalness: metalness,
                    metalnessMap: metalnessmap
                });
            } else if(material_type == 'mesh') {
                return new THREE.MeshBasicMaterial({
                    color: color,
                    map: bitmap,
                });
            }
        }

        let wood = {
            'map': '/models/textures/wood.jpg',
            'bumpmap': '/models/textures/wood.jpg',
        };

        let metal = {
            'map': '/models/textures/metal/map.jpg',
            'bumpmap': '/models/textures/metal/bumpmap.jpg',
            'aomap': '/models/textures/metal/aomap.jpg',
            'lightmap': '/models/textures/metal/lightmap.jpg',
            'metalness': 0.85,
            'roughness': 0.62,
        };

        let brick = {
            'map': '/models/textures/brick/map.jpg',
            'alphamap': '/models/textures/brick/alpha.jpg',
            'aomap': '/models/textures/brick/aomap.jpg',
            'bumpmap': '/models/textures/brick/bumpmap.jpg',
            'displacementmap': '/models/textures/brick/displacementmap.jpg',
            'lightmap': '/models/textures/brick/lightmap.jpg',
            'roughness': 0.8,
        };
        let jeans = {
            'map': '/models/textures/jeans/map.jpg',
            'bumpmap': '/models/textures/jeans/bumpmap.jpg',
            'aomap': '/models/textures/jeans/bumpmap.jpg',
            'lightmap': '/models/textures/jeans/bumpmap.jpg',
            'roughness': 0.75,
        };
        let asphalt = {
            'map': '/models/textures/asphalt/map.jpg',
            'bumpmap': '/models/textures/asphalt/bumpmap.jpg',
            'aomap': '/models/textures/asphalt/aomap.jpg',
            'roughness': 0.6,
        };
        let laminat = {
            'map': '/models/textures/laminat/map.jpg',
            'bumpmap': '/models/textures/laminat/bumpmap.jpg',
            'aomap': '/models/textures/laminat/aomap.jpg',
            'lightmap': '/models/textures/laminat/lightmap.jpg',
            'roughness': 0.2,
            'refractionratio': 0.95,
        };
        let pic = {
            'map': '/models/textures/pic/map.jpg',
            'emissive': 0xed1d7f,
            'emissivemap': '/models/textures/pic/emissivemap.jpg',
            'roughness': 0.3,
            'metalness': 0.6,
        };
        let granite = {
            'map': '/models/textures/granite.jpg',
            'roughness': 0.1,
        };

        let test = {
            'color': 0xed1d7f
        };

        let material_color = setcolor(0x3d4762);
        let material_wood = setmaterial(wood);
        let material_metal = setmaterial(metal);
        let material_brick = setmaterial(brick);
        let material_jeans = setmaterial(jeans);
        let material_asphalt = setmaterial(asphalt);
        let material_laminat = setmaterial(laminat);
        let material_pic = setmaterial(pic);
        let material_granite = setmaterial(granite);
        let material_test = setmaterial(test, 'mesh');

        return [material_color, material_wood, material_metal, material_brick, material_jeans, material_asphalt, material_laminat, material_pic, material_granite, material_test];
    }

    let position = 0;
    for(let item in geometry()) {
        position = position + 6;
        mesh = new THREE.Mesh(geometry()[item], material()[item]);
        mesh.position.set(position, 0, 0);
        mesh.castShadow = true; //default is false
        mesh.receiveShadow = false; //default
        scene.add(mesh);
    }

    // Test Shadow
    let plane = new THREE.BoxBufferGeometry(55, 0.2, 15);
    let plane_mat = new THREE.MeshStandardMaterial({ color: 0x666666 });
    let plane_mesh = new THREE.Mesh(plane, plane_mat);
    plane_mesh.position.set(35, -1.6, 0);
    plane_mesh.receiveShadow = true;
    scene.add(plane_mesh);
}

function loadModel() {

    let setmaterial = function (map, material_type) {
        if(material_type === undefined) {
            material_type = 'standart';
        }

        const onError = (error) => {
            console.log(error);
        };

        let textureLoader = new THREE.TextureLoader();

        let color = null;
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
        if(material_type == 'standart') {
            return new THREE.MeshStandardMaterial({
                color: color,
                map: bitmap,
                aoMap: aomap,
                aoMapIntensity: 1,
                alphaMap: alphamap,
                bumpMap: bumpmap,
                bumpScale: 0.037,
                //displacementMap: displacementmap,
                displacementScale: 0.1,
                displacementBias: 0,
                emissive: emissive,
                emissiveMap: emissivemap,
                emissiveIntensity: 1,
                //envMap: envmap
                lightMap: lightmap,
                lightMapIntensity: 1,
                roughness: roughness,
                roughnessMap: roughnessmap,
                refractionRatio: refractionratio,
                metalness: metalness,
                metalnessMap: metalnessmap
            });
            // [mini] [NO-react-light] Упращенный базовый материал не реагирующий на цвет. Подходит для теста и для простых сцен (возможно еще на элементы в заднем плане)
        } else if(material_type == 'basic') {
            return new THREE.MeshBasicMaterial({
                color: color,
                map: bitmap,
                aoMap: aomap,
                aoMapIntensity: 1,
                specularMap: lightmap
            });
            // [full] [react-light] Материал хорошо подходящий для глянцевых, гладких, отражающих объектов
        } else if(material_type == 'pong') {
            return new THREE.MeshPhongMaterial({
                color: color,
                map: bitmap,
                aoMap: aomap,
                aoMapIntensity: 1,
                alphaMap: alphamap,
                bumpMap: bumpmap,
                bumpScale: 0.037,
                //displacementMap: displacementmap,
                displacementScale: 0.1,
                displacementBias: 0,
                emissive: emissive,
                emissiveMap: emissivemap,
                emissiveIntensity: 1,
                //envMap: envmap
                lightMap: lightmap,
                lightMapIntensity: 1,
                reflectivity: 1, // отражательность
                shininess: 60, // сила блеска
                specular: specular, // цвет блеска
                specularMap: specularmap,
                refractionRatio: refractionratio,
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
                specularMap: lightmap
            });
            // [mini] [NO-react-light] Материал где освещение задается ему вручную через текстуру - matcap.
        } else if(material_type == 'matcup') {
            return new THREE.MeshMatcapMaterial({
                color: color,
                map: bitmap,
                matcap: matcap,
                bumpMap: bumpmap,
                bumpScale: 0.037,
                //displacementMap: displacementmap,
                displacementScale: 0.1,
                displacementBias: 0,
            });
            // [mini] [react-light] [support] Вспомагательный материал которая позволяет визуально увидить normal от карт bump или normalmap
        } else if(material_type == 'normal') {
            return new THREE.MeshNormalMaterial({
                matcap: matcap,
                bumpMap: bumpmap,
                bumpScale: 0.037,
                //displacementMap: displacementmap,
                displacementScale: 0.1,
                displacementBias: 0,
            });
        }
    }

    function set_model_faceman() {
        const onLoad = (gltf) => {

            let textures = {
                'map': 'models/man/textures/Map-COL.jpg',
                'aomap': 'models/man/textures/Map-SPEC.jpg',
                'lightmap': 'models/man/textures/Map-SPEC.jpg'
            }
            let material = setmaterial(textures);

            mesh = new THREE.Mesh(gltf.scene.children[0].geometry, material);
            scene.add(mesh);
        };
        const onProgress = (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        };
        const onError = (error) => {
            //console.log(error);
        };

        const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
        loader.load( 'models/man/man.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
    }

    function set_model_pillar() {

        const onLoad = (gltf) => {

            let textures_pillar = {
                'map': 'models/pillar/textures/pillar.jpg',
            }
            let material_pillar = setmaterial(textures_pillar);
            let mesh_pillar = new THREE.Mesh(gltf.scene.children[2].geometry, material_pillar);
            scene.add(mesh_pillar);

            let textures_fence = {
                'map': 'models/pillar/textures/fence.jpg',
            }
            let material_fence = setmaterial(textures_fence);
            let mesh_fence = new THREE.Mesh(gltf.scene.children[5].geometry, material_fence);
            scene.add(mesh_fence);
            mesh_fence.position.x = 3;
            mesh_fence.position.y = -2.5;
            mesh_fence.position.z = -0.5;

            let textures_cloth = {
                'map': 'models/pillar/textures/cloth.jpg',
            }
            let material_cloth = setmaterial(textures_cloth);
            let mesh_cloth = new THREE.Mesh(gltf.scene.children[4].geometry, material_cloth);
            scene.add(mesh_cloth);
            mesh_cloth.position.x = 3.6;
            mesh_cloth.position.y = -2.5;
            mesh_cloth.position.z = -0.5;

        };
        const onProgress = (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100 ) + '% loaded');
        };
        const onError = (error) => {
            //console.log(error);
        };

        const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
        loader.load( 'models/pillar/pillar.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
    }

    function set_model_home() {
        const onLoad = (gltf) => {

            let textures = {
                'map': 'models/home/textures/diffuse.jpg',
                'bump': 'models/home/textures/bump.jpg',
                'aomap': 'models/home/textures/ao.jpg',
                'lightmap': 'models/home/textures/light.jpg',
                'roughnessmap': 'models/home/textures/rogness.jpg',
            }
            let material = setmaterial(textures);

            mesh = new THREE.Mesh(gltf.scene.children[1].geometry, material);
            // Добавление 2 UV кординат. Правим с косяк aomap
            var geometry = mesh.geometry;
            geometry.addAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
            //
            scene.add(mesh);
        };
        const onProgress = (xhr) => {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        };
        const onError = (error) => {
            //console.log(error);
        };

        const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
        loader.load( 'models/home/home.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
    }

    function set_model_room () {

        function point() {

            let plane = new THREE.BoxBufferGeometry(0.5, 1, 0.5);
            let material = new THREE.MeshStandardMaterial({ color: 0x8FBCD4 });
            mesh = new THREE.Mesh(plane, material);
            mesh.position.set(4.7, 3.6, 4.7);
            scene.add(mesh);
        }
        function wall() {
            const onLoad = (gltf) => {

                let textures = {
                    'map': 'models/room/walls/textures/diffuse.jpg',
                    'bumpmap': 'models/room/walls/textures/bump.jpg',
                    'aomap': 'models/room/walls/textures/ao.jpg',
                    'emissivemap': 'models/room/walls/textures/emissive.jpg',
                    'lightmap': 'models/room/walls/textures/light.jpg',
                    'roughnessmap': 'models/room/walls/textures/roughness.jpg',
                    'matcap': 'models/textures/m_white.jpg',
                    'specular': '0x666666',
                    'specularmap': 'models/room/walls/textures/light.jpg',
                }
                let material = setmaterial(textures);

                mesh = new THREE.Mesh(gltf.scene.children[1].geometry, material);
                // Добавление 2 UV кординат. Правим с косяк aomap
                var geometry = mesh.geometry;
                geometry.addAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
                //
                scene.add(mesh);

                //camera.controls.game.param.objects.push(mesh);
            };
            const onProgress = (xhr) => {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            };
            const onError = (error) => {
                //console.log(error);
            };

            const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
            loader.load( 'models/room/walls/model.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
        }
        function kaskas() {
            const onLoad = (gltf) => {

                let textures = {
                    'color': 0x3a3a3a,
                    'metalness': 0.9,
                    'roughness': 0.4,
                }
                let material = setmaterial(textures);

                mesh = new THREE.Mesh(gltf.scene.children[1].geometry, material);
                mesh.rotation.x = Math.PI/2
                mesh.rotation.z = Math.PI/2
                mesh.position.set(5.7, 3.8, -3.22);
                scene.add(mesh);
            };
            const onProgress = (xhr) => {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            };
            const onError = (error) => {
                //console.log(error);
            };

            const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
            loader.load( 'models/room/karkas.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
        }
        function tv() {
            const onLoad = (gltf) => {

                let textures = {
                    'map': 'models/room/tv/textures/diffuse.jpg',
                    'emissivemap': 'models/room/tv/textures/emissive.jpg',
                    'roughnessmap': 'models/room/tv/textures/roughness.jpg',
                }
                let material = setmaterial(textures);

                mesh = new THREE.Mesh(gltf.scene.children[1].geometry, material);
                // Добавление 2 UV кординат. Правим с косяк aomap
                var geometry = mesh.geometry;
                geometry.addAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
                //
                mesh.position.set(5.7, 0.5, -1.9);
                scene.add(mesh);
            };
            const onProgress = (xhr) => {
                //(xhr.loaded / xhr.total * 100) + '% loaded');
            };
            const onError = (error) => {
                //console.log(error);
            };

            const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
            loader.load( 'models/room/tv/model.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
        }
        function panel() {
            const onLoad = (gltf) => {

                let textures = {
                    'color': 0x333333,
                    'metalness': 0.9,
                    'roughness': 0.4,
                }
                let material = setmaterial(textures);

                mesh = new THREE.Mesh(gltf.scene.children[1].geometry, material);
                mesh.position.set(0.4, 0.033, -4.46);
                scene.add(mesh);
            };
            const onProgress = (xhr) => {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            };
            const onError = (error) => {
                //console.log(error);
            };

            const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
            loader.load( 'models/room/panel.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
        }
        function door() {
            const onLoad = (gltf) => {

                let textures = {
                    'color': 0x333333,
                    'metalness': 0.9,
                    'roughness': 0.4,
                }
                let material = setmaterial(textures);

                mesh = new THREE.Mesh(gltf.scene.children[1].geometry, material);
                mesh.position.set(5.87, 1.7, 1.58);
                mesh.rotation.x = THREE.Math.degToRad(90);
                mesh.rotation.z = THREE.Math.degToRad(90);
                scene.add(mesh);
            };
            const onProgress = (xhr) => {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            };
            const onError = (error) => {
                //console.log(error);
            };

            const loader = new GLTFLoader(); // Здесь задаем загрузщики, их много видов. По умолчанию (THREE.DefaultLoadingManager), меняется редко.
            loader.load( 'models/room/door.glb', gltf => onLoad(gltf), xhr => onProgress(xhr), error => onError(error));
        }

        //point();
        wall();
        kaskas();
        tv();
        panel();
        door();
    }

    //set_model_faceman();
    //set_model_pillar();
    //set_model_home();
    set_model_room();
}

function test_core() {

    function bufferGeometry() {
        // ## Matrix - в этом мат формате храниться инфо 3D-преобразований: положение, вращение, масштаблировние.
        // ## Каждый экземпляр Object3D имеет матрицу.
        // ## object.matrixAutoUpdate = false; он в объектах(mesh, light, shadow, camera т так далее) стоит true что автоматом обновляется,
        // ## Можно контролировать процес сделав false и самому объекту задать матрицу

        // # BufferAttribute - это класс нужен для хранение данных атрибутов(положение vertex, цвета, UV кординаты, нормали и другие настраиваыемы атрибуты) нужных для BufferGeometry
        // Прямой он не испольузется, он помогает BufferGeometry.

        // # BufferGeometry - основной класс геометрий где храниться вертексы, грани, uv кординаты, нормали, цвет и др вещи. Он по умолчанию пустой.
        let geometry = new THREE.BufferGeometry();

        // ## Основыне понятие в BufferGeometry ## //
        // vertex - это точки, они находится в пространстве. Через BufferAtribute
        // index - это тренгуляры, те mesh как в 3dmax. Через это создается поверхность, полигоны
        // normal - это спец кординаты для объекта которая работает с поверхностью и светом, что в свою очередь создает сглаженность lowpoly объекта. В реале свет таки введет себя. Через BufferAtribute
        // Этим мы свою lowpoly модель сгладим, без больших полигонов. Это же создает - РЕАЛИЗМ
        // UV - кординаты mapping. Через BufferAtribute

        // Есть простой аналог BufferGeometry - Geometry, но он долго обрабытываемый. С ним можно делать только простые гемометрий.
        // У него есть след основные вещи: vertex position, faces(это index в BufferGeometry), colors, etc.
        // Для вставки faces используется класс - Face3

        // св: attributes - устанавливаем или получаем с помощью setAttribute и getAttribute. Атрибуты получаем вставим с BufferAttribute
        // св: boundingBox - расчет границы в виде куба
        // св: boundingSphere - расчет границы в виде шара
        // св: drawRange - колво вершин.
        // св: group - группы разделенный геометрий
        // св: id - уникальный id
        // св: index - хранит треуголники из который состоит гемотерия. Это как EditableMesh в 3dmax.
        // св: morphAttributes - хранит теуголники  для трансформаций геометрий
        // св: name - имя геометрий
        // св: userData - храним какие-то свои пользователские данные
        // св: uuid - уникальный id геометрий, не редактируется

        // BufferAttribute принимает типизированные массивы данных.
        // Int16Array, Int8Array, Int32Array - здесь 8 16 32 означает длина массива. Есть различные типы int float unit, c размерами. Типовые массивы быстрее работают в отличий от обычных
        let ls1 = new Int8Array(12); // Здесь можно хранить только int даннык
        ls1[0] = 4;
        ls1[1] = 16;
        ls1[2] = 18;
        ls1[3] = 24;
        ls1[4] = 4.48; // это станет 4
        ls1[5] = 'string'; // тут будет 0

        // test BufferAttribute
        let geometry_attr = new THREE.BufferGeometry();
        let vertices_box = new Float32Array([
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ]);
        let attr = new THREE.BufferAttribute(/*vertices_box, 3*/);
        attr.array = vertices_box;
        attr.count = 6; // Длина массива. Кол-во автоматический расчитывается если array, itemSize дать в конструктор
        attr.itemSize = 3;
        attr.name = 'Deep'; // Название, это для меня. Идентифицирую этот атрибут
        attr.needsUpdate = true; // Даем указания что если атрибут изменился, то его сного надо передать видеокарте
        attr.onUploadCallback = function() { // Срабатывает, тогда когда данные были приняты видеокартой. Не знаю когда использовать, возможно пригодиться.
            //console.log('Видеокарта принела данные');
        }
        // св:version - показывается версию изминенй этого экземпляра.

        // Задаем в Геометрия атрибут. Есть так сказать 2 варианте передачи атрибутов.1 Через сам BufferAttribute, 2 через разновидность BufferAttribute с соотвествущиемся типизированным массивом - к примеру Float32BufferAttribute
        // Если мы задаем через сам BufferAttribute, то правильно будет ему отправлять типизированные массивы - Float32Array.
        // Можно отправить просто обычный массив [], без Float32Array, но так можно отправить только к Float32BufferAttribute. Такие типизированные BufferAttribute сами обычные массивы [] преоброзуют в типизированные
        geometry_attr.setAttribute('position', attr); // Для position, normal, color, uv вставим 3 в itemSize

        // test Geo 1
        let geo_1 = new THREE.SphereBufferGeometry(1.4, 32, 32);
        //var geo_1 = new THREE.ConeBufferGeometry(1.4, 2, 32);
        let get_index_1 = geo_1.getIndex(); // getIndex - получить index
        let get_position_1 = geo_1.getAttribute('position');
        let get_normal_1 = geo_1.getAttribute('normal');
        let get_uv_1 = geo_1.getAttribute('uv');

        //geometry.setAttribute('position', new THREE.BufferAttribute(vertices_array, 3));
        geometry.setAttribute('position', get_position_1); // position - это кординаты vertex. Появиться сетка, точки
        geometry.setIndex(get_index_1); // index - устанавливаем тренгуляры, те mesh. Теперь объект выглядит как объект с полигонами.
        geometry.setAttribute('normal', get_normal_1); // задаем нормали.
        geometry.setAttribute('uv', get_uv_1); // можем задать UV кординаты для текстур. Мы можем управлить UV в TextureLoader
        let colors = []; // Мне нужен конструктор чтоб расчитать и получить правильные position, index, normal, uv. Можно расчитать вручную.
        for(let g in get_position_1.array) {
            colors.push(Math.random(), Math.random(), Math.random());
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); // можно и цвет задать, но я его так в гемотрию задавать не буду. В материале этого делать.
        geometry.computeBoundingBox(); // Граничная рамка в виде box
        geometry.computeBoundingSphere(); // ??? надо узнать эти границы для чего
        //geometry.computeVertexNormals(); // граница для нормалей
        geometry.normalizeNormals(); // Нужно для исправление освещение в поверхностий. Пока не понятно что он там исправляет.
        geometry.center(); // после установки границ, геометрия надо оцентровать в нем

        //let matrix = new THREE.Matrix4() // Three js работает с марицей. В нем хранятся данные положение, вращение, масштаб. Создаем пустую матрицу
        //matrix.set( 1,  3,  3, 0,
        //    -3, -5, -3, 0,
        //    3,  3,  1, 0,
        //    0,  0,  0, 1);
        //geometry.applyMatrix4(matrix); // геометрия измениться по данным матрицы

        let geometry2 = geometry.clone(); // клонирование
        let new_geometry = new THREE.BufferGeometry();
        new_geometry.copy(geometry); // копирование данных от другого BufferGeometry
        geometry2.dispose(); // Удаляем геометрия. Не оставляет утечки в памяти.
        // mt: EventDispatcher - втстроен сюда. Он это EventListener. Слушаем изминений в геометрий
        // mt: geometry2.fromDirectGeometry(DirectGeometry) - вводим данные сюда от DirectGeometry
        // mt: geometry2.fromGeometry(Geometry) - вводим данные сюда от обычнего Geometry, которую я скорее всего использовать не буду.
        // mt: geometry2.deleteAttribute('color') - удаляет атрибут
        // mt: geometry2.setFromObject(Object3D) - добавляет атрибуты из объекта Object3D

        let merge_1 = new THREE.SphereBufferGeometry(1.4, 24, 24);
        let merge_2 = new THREE.ConeBufferGeometry(1.4, 2, 32);
        merge_2.rotateX(THREE.Math.degToRad(30));
        merge_2.rotateY(THREE.Math.degToRad(30));
        merge_2.rotateZ(THREE.Math.degToRad(30));
        merge_2.scale(1.2, 1.2, 1.2);
        merge_2.translate(1.2, 1.2, 1.2);
        let merge = merge_1.merge(merge_2, 2); // Скрепляет 2 геометрий. Могут сломаться полигоны.

        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ /*vertexColors: true*/ }));
        mesh.position.set(0,2,0);
        scene.add(mesh);
    }
    function clock() {

        // Это часы
        var clock = new THREE.Clock(); // Параметр autoStart по умолчанию true
        clock.start();
    }
    function set_raycaster() {

        raycaster.cast = new THREE.Raycaster();
        raycaster.mouse = new THREE.Vector2();
        raycaster.func = function onMouseMove(event) {
            if(event !== undefined) {
                raycaster.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                raycaster.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }
        }
    }
    function font() {

        var loader = new THREE.FontLoader();
        var font = loader.load(
            // resource URL
            'models/fonts/roboto_regular.json',

            // onLoad callback
            function (font) {

                let matLite = new THREE.MeshBasicMaterial({
                    color: 0x006699,
                    transparent: true,
                    opacity: 1,
                    side: THREE.DoubleSide
                });

                let generate_text = "EvilGoogle";
                let shapes = font.generateShapes(generate_text, 2);

                // shape - это форма, не геометрия, он строиться из линий.
                let geometry = new THREE.ShapeBufferGeometry(shapes); // из формы создаем геометрию
                geometry.computeBoundingBox();

                let text = new THREE.Mesh(geometry, matLite);
                text.position.y = 2;
                scene.add(text);
            },

            // onProgress callback
            function ( xhr ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // onError callback
            function ( err ) {
                console.log(err);
                //console.log( 'An error happened' );
            }
        );
    }
    function curve() {

        //let curve = new THREE.Curve(); // Абстрактный базовый класс для кривых
        //get.getPoint(1);
        //get.getPointAt(1);
        //get.getLength();

        /*var curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            5, 2,           // xRadius, yRadius
            0,  2 * Math.PI,  // это отрисовка кольца
            false,            // по часовой или против часовой строим кольцо
            0                 // aRotation
        );*/

        /*var curve = new THREE.CatmullRomCurve3([ // Это создает произвольную кривую
            new THREE.Vector3(-4, 0, 4),
            new THREE.Vector3(-3, 3, 3),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(2, -2, 2),
            new THREE.Vector3(4, 0, 4)
        ]);
        curve.closed = true; // Если true, то линия коректируясь замкнеться
        curve.curveType = 'catmullrom'; // тип отрисовки. На глаз одинаковое*/

        /*var curve = new THREE.CubicBezierCurve( // создаем линия на основе 4 точек
            new THREE.Vector2( -10, 0 ), // начальная точка
            new THREE.Vector2( -5, 15 ), // смежная точка 1
            new THREE.Vector2( 20, 15 ), // смежная точка 2
            new THREE.Vector2( 10, 0 ) // конечная точка
        );*/

        /*var curve = new THREE.CubicBezierCurve3( // тоже самое как CubicBezierCurve, но имеется z кордината. Можно наклонить по z
            new THREE.Vector3( -10, 0, 0 ),
            new THREE.Vector3( -5, 15, 0 ),
            new THREE.Vector3( 20, 15, 0 ),
            new THREE.Vector3( 10, 0, 0 )
        );*/

        var curve = new THREE.LineCurve( // создаем линию
            new THREE.Vector2(1, 0),
            new THREE.Vector2(3, 4),
        );

        /*var curve = new THREE.LineCurve3( // тоже самое что LineCurve, но есть z кордината
            new THREE.Vector3(1, 0, 2),
            new THREE.Vector3(3, 4, 3),
        );*/

        /*var curve = new THREE.QuadraticBezierCurve( // создаем линия на основе 3 точек.
            new THREE.Vector2( -10, 0 ), // начальная точка
            new THREE.Vector2( 20, 15 ), // смежная точка
            new THREE.Vector2( 10, 0 ) // конечная точка
        );*/

        /*var curve = new THREE.QuadraticBezierCurve3( // тотже QuadraticBezierCurve, но с z кординатой
            new THREE.Vector3( -10, 0, 0 ),
            new THREE.Vector3( 20, 15, 0 ),
            new THREE.Vector3( 10, 0, 0 )
        );*/

        /*var curve = new THREE.SplineCurve([ // Тоже самое что CatmullRomCurve3 создает произвольгую линию, но тольков xy кординатах
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 5, -5 ),
            new THREE.Vector2( 10, 0 )
        ]);*/

        var points = curve.getPoints(50); // Точки в кординате с добавленными 50 точками для округление
        //console.log(curve.getLength()); // Получаем общую длину кривой
        //console.log(curve.getTangent(20)); // получается xyz для чего не понятно

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color : 0xff0000 });
        var line = new THREE.Line(geometry, material);
        scene.add(line);
    }
    function path() {

        // Создает контуры - те же самые линий, но можно бесконечными цепочками создавать
        var path = new THREE.Path();

        // path.absarc(0, 0, 3, THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(300)); // создает arc. точное копия - EllipseCurve
        // path.absellipse(0, 0, 3, 2, THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(300)); // рисуем элипс
        // path.bezierCurveTo(0, 2, 2, 3, 2, 0); // создает bezier кривую от 4 точек
        // path.lineTo(0, 3); // создаем линия x y
        // path.moveTo(-3, 0); // двигаем
        // path.quadraticCurveTo(0, 3, 0, 1); // создает линию которую можно изкривыть
        path.lineTo(0, 3);
        path.lineTo(3, 3);
        path.lineTo(3, 0);
        path.lineTo(0, 0);

        var get = path.getPoints();

        var geometry = new THREE.BufferGeometry().setFromPoints(get);
        var material = new THREE.LineBasicMaterial({color: 0xffffff});

        var line = new THREE.Line(geometry, material);
        line.lookAt(3, 0, 3);
        line.rotation.x = THREE.MathUtils.degToRad(90);
        scene.add(line);
        console.log(114);
    }
    function marchingCubesFunc() {

        // ImmediateRenderObject - есть такой класс для геометрий, он легкий в обработке. Нужен для трансформирующиеся 3d моделей как MarchingCubes
        let materials = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x888888, shininess: 250 });

        let effect = new MarchingCubes(28, materials, true, true);
        effect.position.set(0, 2, 0);
        effect.scale.set(1, 1, 1);
        effect.enableUvs = false;
        effect.enableColors = false;

        scene.add(effect);
    }
    function group() {
        var geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

        var meshes = [];
        for(let i=0; i < 2; i++) {
            var cube = new THREE.Mesh(geometry, material);
            cube.position.set( i, 0, 0 );
            meshes.push(cube);
        }

        var group = new THREE.Group();
        for(let m in meshes) {
            console.log(meshes[m]);
            group.add(meshes[m]);
        }

        console.log(group);
        scene.add( group );
    }

    //clock();
    //bufferGeometry();
    set_raycaster();
    //curve()
    //font();
    //path();
    //marchingCubesFunc();
    //group();
}

function test_math() {

    function box3() {

        var box = new THREE.Box3();

        var mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0xfff000})
        );
        mesh.position.set(0,2,0);
        mesh.geometry.computeBoundingBox();
        box.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);

        //scene.add(box);
        //console.log(box);
    }
    //box3();
}

function test_helpers() {

    function arrowHelper() {

        // Хелпер - Стрелка
        var dir = new THREE.Vector3(2, 0, 0); // Направление стрелы
        dir.normalize();
        var origin = new THREE.Vector3(0, 0, 0); // Стартовая точка

        var length = 2; // Длина стрелки
        var hex = 0xffff00;
        var headLength = 0.2 * length; // Длина наконечника
        var headWidth = 0.4 * headLength; // Размер шляпы наконечника

        var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth);
        // arrowHelper.setColor(0x000617); Установка цвета
        // arrowHelper.setLength(length, headLength, headWidth); Установка длин
        arrowHelper.setDirection(new THREE.Vector3(2, 1, 0));
        arrowHelper.position.y = 1;
        scene.add(arrowHelper);
    }
    function axesHelper() {

        // Хелпер ось XYZ
        var axesHelper = new THREE.AxesHelper(2);
        axesHelper.position.set(-3, 1, -3);
        scene.add(axesHelper);
    }
    function boxHelper() {

        let plane = new THREE.SphereBufferGeometry(0.5, 24, 24);
        let material = new THREE.MeshStandardMaterial({ color: 0x8FBCD4 });
        mesh = new THREE.Mesh(plane, material);
        mesh.position.set(3, 1, 0);
        scene.add(mesh);

        // Этот хелпер нужен для обозначение границ объектов Geometry и BufferGeometry. В него задаем mesh и этот хелпер встанет в ее границы коробкой.
        var box = new THREE.BoxHelper(mesh, 0xffff00);
        scene.add(box);
    }
    function box3Helper() {

        // Есть вот такие классы - Box2 и Box3 для создание ограничительных границ
        // Box3Helper - помогает ее визуализировать.

        // Box3. Вспомним есть св boundingBox в BufferGeometry. Это как раз расчет этой ограничительной Box3
        var geometry = new THREE.SphereBufferGeometry(0.5, 24, 24);
        geometry.computeBoundingBox();

        var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x8FBCD4 }));
        var box3 = new THREE.Box3();
        box3.copy(mesh.geometry.boundingBox); // Взяли параметры для box3

        // Box3Hepler
        var helper = new THREE.Box3Helper(box3, 0xffff00 );
        scene.add(helper); //
    }
    function cameraHelper() {
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(3, 2, 2);
        camera.updateMatrix();
        var helper = new THREE.CameraHelper(camera);
        scene.add(helper);

        //helper.matrixAutoUpdate = true;
        helper.updateMatrix();
        helper.update();
    }
    function directionLightHelper() {

        var light = new THREE.DirectionalLight(0xFFFFFF, 10);
        light.position.set(0, 8, 4);
        var helper = new THREE.DirectionalLightHelper(light, 5, 0xFFFFF0);
        scene.add(light);
        scene.add(helper);
    }
    function gridHelper() {

        // Создаем квадрат с сеткой. Как в 3dmax-е в окне perspective
        var size = 10;
        var divisions = 10;

        var gridHelper = new THREE.GridHelper( size, divisions );
        scene.add(gridHelper);
    }
    function polarGridHelper() {

        // Создаем сетку в виде круга
        var radius = 10;
        var radials = 16;
        var circles = 8;
        var divisions = 64;

        var helper = new THREE.PolarGridHelper(radius, radials, circles, divisions);
        scene.add(helper);
    }
    function hemisphereLightHelper() {

        // Хелпер для светильника HemisphereLight
        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        var helper = new THREE.HemisphereLightHelper(light, 5);
        scene.add(helper);
    }
    function pointLightHelper() {

        // Для светильника pointLight
        var pointLight = new THREE.PointLight(0xff0000, 1, 100);
        pointLight.position.set(0, 2.2, 0);
        scene.add(pointLight);

        var pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3);
        scene.add(pointLightHelper);
    }

    arrowHelper();
    axesHelper();
    boxHelper();
    box3Helper();
    //cameraHelper();
    //directionLightHelper();
    //gridHelper();
    //polarGridHelper();
    //hemisphereLightHelper();
    pointLightHelper();
}

function test_objects() {

    function points() {

        var box_geometry = new THREE.BoxBufferGeometry(2, 2, 2).getAttribute('position');
        var geometry = new THREE.BufferGeometry();

        var point_1 = [ // 1 точка
            1, 1, 1,
        ];
        var point_2 = [ // 3 точка
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
        ];
        var point_3 = new Float32Array([
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ]);
        let attr = new THREE.BufferAttribute(point_3, 3);
        let type_attr = new THREE.Int32BufferAttribute(point_2,3)
        geometry.setAttribute('position', box_geometry);

        let textureLoader = new THREE.TextureLoader();
        var alphamap = textureLoader.load('/models/textures/brick/alphablock.jpg', undefined, undefined, error => onError(error));
        alphamap.anisotropy = 8; // C альфа каналом были проблемы и в mesh. Похоже надо дать green канал
        var map = textureLoader.load('/models/textures/brick/map.jpg', undefined, undefined, error => onError(error));
        map.anisotropy = 8;
        // Материал для точек. Он рабоат также на тренгуляр геометрий, но ограниченно к примеру карты не работают.
        // материалы как MeshStandardMaterial, MeshBasicMaterial, Pong не будут работать на точках, им нужны тренгуляры
        var material = new THREE.PointsMaterial({color: 0x888888});
        material.alphaMap = alphamap;
        material.map = map;
        material.size = 0.4; // размер точек. Точки они квадратные

        var mesh = new THREE.Mesh(geometry, material); // Передали geometry(point_2) с 3 точками которая создала Mesh
        mesh.position.set(-2, 1, 0);
        scene.add(mesh);

        // Points - создает точки, в отличий от mesh по position не будут создоваться тренгуляры, они встанут как точки. Точки всегда смотрять в сторону камеры
        var point = new THREE.Points(geometry, material); // Передали geometry(point_2) с 3 точками и эти 3 точки встали в свои кординаты.
        point.position.set(1, 1, 0);
        scene.add(point);
    }
    function line() {

        // 1
        var points = [];
        points.push(new THREE.Vector3( - 3, 0, 0 ));
        points.push(new THREE.Vector3( 0, 3, 0 ));
        points.push(new THREE.Vector3( 3, 0, 0 ));
        var geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points); // это берет точки и установить его в атрибут

        // 2
        var vertices = new Float32Array([
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ] );
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // 3
        var vertices = new Float32Array([
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,
        ]);
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        // 4
        var curve = new THREE.SplineCurve([
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 5, -5 ),
            new THREE.Vector2( 10, 0 )
        ]);
        var points = curve.getPoints(50);
        var geometry = new THREE.BufferGeometry().setFromPoints(points);

        console.log(geometry);

        // Материал для линий
        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff,
            linewidth: 3, // Толщина линий, работает только на некоторых линиях
            morphTargets: false // Деформаций
        });
        var line = new THREE.Line(geometry, material);
        line.position.x = -3
        scene.add(line);

        var material = new THREE.PointsMaterial({ color: 0x888888 });
        var point = new THREE.Points(geometry, material);
        point.position.x = 0
        scene.add(point);

        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 2;
        mesh.position.x = 3;
        scene.add(mesh);
    }
    // InstancedMesh - быстрый рендер если есть много одинаковых моделей с разными трансформациями
    function lineLoop() {

        // Не понял чем отличается от line, но он юзает gl.LINE_LOOP от WebGL
        var points = [];
        points.push(new THREE.Vector3( - 3, 0, 0 ));
        points.push(new THREE.Vector3( 0, 3, 0 ));
        points.push(new THREE.Vector3( 3, 0, 0 ));
        points.push(new THREE.Vector3( -1, -2, 0 ));
        points.push(new THREE.Vector3( -3, 0, -0.2 ));
        var geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points);

        // Материал для линий
        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff,
            linewidth: 3, // Толщина линий, работает только на некоторых линиях
            morphTargets: false // Деформаций
        });
        var line = new THREE.Line(geometry, material);
        line.position.x = -3
        scene.add(line);
    }
    function lineSegments() {

        // Это визуально не отичаеться от Line, но юзает gl.LINES от WebGL
        var points = [];
        points.push(new THREE.Vector3( - 3, 0, 0 ));
        points.push(new THREE.Vector3( 0, 3, 0 ));
        points.push(new THREE.Vector3( 3, 0, 0 ));
        points.push(new THREE.Vector3( -1, -2, 0 ));
        var geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points);

        // Материал для линий
        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff,
            linewidth: 3, // Толщина линий, работает только на некоторых линиях
            morphTargets: false // Деформаций
        });
        var line = new THREE.Line(geometry, material);
        line.position.x = -3
        scene.add(line);
    }
    function lod() {

        // LOD - это подгрузчик моделей. Очень нужная вещь когда в цене много моделей, чтоб при отдалений заменялись на lowpoly
        // Техналогия в играх. Пример - warthunder, далеко летим low модели погружены, подходим средние модели подгрузились, близко подходим highpoly модель подгрузилась со своими соотвественно текстурами
        var lod = new THREE.LOD();
        // св: level - главная вещь lod. В нем храниться дитанция и модель.

        let box1 = new THREE.IcosahedronBufferGeometry(2, 2);
        let material1 = new THREE.MeshStandardMaterial({ color: 0x8FBCD4 });
        let mesh1 = new THREE.Mesh(box1, material1);
        lod.addLevel(mesh1, 20);

        let box2 = new THREE.IcosahedronBufferGeometry(2, 4);
        let material2 = new THREE.MeshStandardMaterial({ color: 0x8FBCD4 });
        let mesh2 = new THREE.Mesh(box2, material2);
        lod.addLevel(mesh2, 10);

        console.log(lod.getCurrentLevel()); // Получить текущий уровень
        console.log(lod.getObjectForDistance()); // Получить модлеь текущего уровня
        scene.add(lod);
    }
    function sprite() {

        // Справйт - это объект как точка которая всегда смотрить в сторону камеры. В его материал вставляешь изображение и это изображение отобразиться на Sprite объекте
        var spriteMap = new THREE.TextureLoader().load("/models/textures/flame.png");

        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
        var sprite = new THREE.Sprite(spriteMaterial);
        scene.add(sprite);
    }

    //points();
    //line();
    //lineLoop();
    //lineSegments();
    //lod();
    //sprite();
}

function test_material() {

    let setmaterial = function (map, material_type) {
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

    let objects = ['asphalt', 'brick', 'jeans', 'laminat', 'metal', 'pic'];
    let geometry = new THREE.SphereBufferGeometry(1.2, 48, 48);
    let group = new THREE.Group();
    function phong() {

        let i = 0;
        for(let key in objects) {

            let textures = {
                'map': 'models/textures/'+objects[key]+'/map.jpg',
                'alphamap': 'models/textures/'+objects[key]+'/alphamap.jpg',
                'bumpmap': 'models/textures/'+objects[key]+'/bumpmap.jpg',
                'aomap': 'models/textures/'+objects[key]+'/aomap.jpg',
                'emissivemap': 'models/textures/'+objects[key]+'/emissivemap.jpg',
                'lightmap': 'models/textures/'+objects[key]+'/lightmap.jpg',
                //'specular': '0x666666',
                'specularmap': 'models/textures/'+objects[key]+'/specularmap.jpg',
            }
            let material = setmaterial(textures, 'pong');
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(-6, 0, i);

            group.add(mesh);

            i = i - 3;
        }
    }
    function mesh() {

        let i = 0;
        for(let key in objects) {

            let textures = {
                'map': 'models/textures/'+objects[key]+'/map.jpg',
                'alphamap': 'models/textures/'+objects[key]+'/alphamap.jpg',
                'bumpmap': 'models/textures/'+objects[key]+'/bumpmap.jpg',
                'aomap': 'models/textures/'+objects[key]+'/aomap.jpg',
                'emissivemap': 'models/textures/'+objects[key]+'/emissivemap.jpg',
                'lightmap': 'models/textures/'+objects[key]+'/lightmap.jpg',
                'roughnessmap': 'models/textures/'+objects[key]+'/roughnessmap.jpg',
                'metalnessmap': 'models/textures/'+objects[key]+'/metalnessmap.jpg',
                'roughness' : 0.6
            }
            let material = setmaterial(textures, 'standard');
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(-3, 0, i);

            group.add(mesh);

            i = i - 3;
        }
    }
    function lambert() {

        let i = 0;
        for(let key in objects) {
            let textures = {
                'map': 'models/textures/'+objects[key]+'/map.jpg',
                'alphamap': 'models/textures/'+objects[key]+'/alphamap.jpg',
                'bumpmap': 'models/textures/'+objects[key]+'/bumpmap.jpg',
                'aomap': 'models/textures/'+objects[key]+'/aomap.jpg',
                'emissivemap': 'models/textures/'+objects[key]+'/emissivemap.jpg',
                'lightmap': 'models/textures/'+objects[key]+'/lightmap.jpg',
                'specular': '0x666666',
                'specularmap': 'models/textures/'+objects[key]+'/specularmap.jpg',
            }
            let material = setmaterial(textures, 'lambert');
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, i);

            group.add(mesh);

            i = i - 3;
        }
    }
    function physical() {

        let i = 0;
        for(let key in objects) {
            let textures = {
                'map': 'models/textures/'+objects[key]+'/map.jpg',
                'alphamap': 'models/textures/'+objects[key]+'/alphamap.jpg',
                'bumpmap': 'models/textures/'+objects[key]+'/bumpmap.jpg',
                'aomap': 'models/textures/'+objects[key]+'/aomap.jpg',
                'emissivemap': 'models/textures/'+objects[key]+'/emissivemap.jpg',
                'lightmap': 'models/textures/'+objects[key]+'/lightmap.jpg',
                'roughnessmap': 'models/textures/'+objects[key]+'/roughnessmap.jpg',
                'metalnessmap': 'models/textures/'+objects[key]+'/metalnessmap.jpg',
                'roughness' : 0.6
            }
            let material = setmaterial(textures, 'physical');
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(-9, 0, i);

            group.add(mesh);

            i = i - 3;
        }
    }

    phong();
    mesh();
    lambert();
    physical();

    group.position.set(45, 0, -2);
    group.rotation.y = THREE.Math.degToRad(90);
    scene.add(group);

    let plane = new THREE.BoxBufferGeometry(55, 0.2, 15);
    let plane_mat = new THREE.MeshStandardMaterial({ color: 0x666666 });
    let plane_mesh = new THREE.Mesh(plane, plane_mat);
    plane_mesh.position.set(35, -1.6, 0);
    plane_mesh.receiveShadow = true;
    scene.add(plane_mesh);
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
                if (intersects.length > 0 && intersects[0].object.name == 'world') {
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
                    if (intersects.length > 0 && intersects[0].object.name == 'world') {
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
            this.object;
        }

        init() {
            this.transform.setMode("translate");
            this.transform.addEventListener('dragging-changed', function (event) {
                camera.controls.view.enabled = !event.value
            });

            let transform = this.transform;
            this.drag.enabled = false;
            this.drag.addEventListener('dragstart', function (event) {
                if(event.object.name != 'world') {
                    transform.attach(event.object);
                    scene.add(transform);

                    this.object = event.object;
                }
            });
        }

        destroy() {
            this.transform.detach();
        }
    }

    // Start
    let objects = [];
    let building_walls = [];

    // Установка мира
    function set_world() {
        let geo = new THREE.PlaneBufferGeometry( 1000, 1000 );
        geo.rotateX(- Math.PI / 2);

        let mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ visible: false }));
        mesh.name = 'world';
        mesh.position.set(0, 0, 0);

        return mesh;
    }
    let world = set_world();

    scene.add(world);
    objects.push(world);

    // Установка елементов в цену
    let drag = new Drag(objects);
    $('.js_print_add').click(function () {
        let libs = new Libs('model', $(this).data('id'));
        let picking = libs.init();

        let model = new Insert(picking, objects);
        model.init();

        drag.init(objects);
    });

    /* ----------------- */
    /*let objects_draw = {
        'points': [],
        'shape': null
    };

    let draw_drag = new Drag(objects_draw.points);
    draw_drag.spline_listener = function () {

        let line = this.line;
        let go_shape = this.shape;
        this.transform.addEventListener('objectChange', function () {

            let shape = new THREE.Shape();

            shape.moveTo(objects_draw.points[3].position.x, objects_draw.points[3].position.z);
            for(let d in objects_draw.points) {
                shape.lineTo(objects_draw.points[d].position.x, objects_draw.points[d].position.z);
            }

            let curve = shape.getPoints();
            line.geometry.setFromPoints(curve);
            go_shape = shape;
        });
        this.transform.addEventListener('mouseUp', function () {
            objects_draw.shape = go_shape;
        })
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
                objects_draw.points.push(mesh);
            }

            let curve = shape.getPoints();
            var geometry = new THREE.BufferGeometry().setFromPoints(curve);
            var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
            var line = new THREE.Line(geometry, material);
            line.rotation.x = THREE.MathUtils.degToRad(90);

            scene.add(line);

            draw_drag.line = line;
            draw_drag.shape = shape;
            draw_drag.init();
            draw_drag.spline_listener();
        }

        create();
    });

    $('.js_extrude').click(function () {

        var setting = {
            steps: 2,
            depth: 16,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry(objects_draw.shape, setting);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var mesh = new THREE.Mesh(geometry, material) ;
        scene.add(mesh);
    });

    document.addEventListener('keydown', function (event) {
        if(event.keyCode == 27) {
            drag.destroy();
            draw_drag.destroy();
        }
    }, false);*/

    /* ----------------- */
    /*class Box {

        constructor(pointer) {
            this.pointer = pointer();
            this.line;
            this.events = {
                'onDocumentMouseMove': null,
                'onDocumentMouseDown': null,
                'transform': new TransformControls(camera.camera, renderer.domElement),
            }

            this._init();
        }

        _events(set_point = null) {
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();

            let elements = {
                'destroy': this._destroy,
                'line': this.line,
                'pointer': this.pointer,
                'events': this.events,
                '_events': this._events,
                '_move': this._move,
                '_rotate': this._rotate
            };

            let start = this._start;
            let end = this._end;

            this.events.onDocumentMouseMove = function onDocumentMouseMove(event) {
                event.preventDefault();

                mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
                raycaster.setFromCamera(mouse, camera.camera);

                let intersects = raycaster.intersectObjects([dummy]);
                if (intersects.length > 0 && intersects[0].object.name == 'dummy') {

                    let intersect = intersects[0];
                    if(set_point === null) {
                        elements.pointer.position.copy(intersect.point);
                    } else {
                        elements._move(elements, intersect);
                    }
                }
            }
            this.events.onDocumentMouseDown = function onDocumentMouseDown(event) {
                event.preventDefault();
                if(event.which == 1) {

                    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
                    raycaster.setFromCamera(mouse, camera.camera);

                    var intersects = raycaster.intersectObjects([dummy]);
                    if (intersects.length > 0 && intersects[0].object.name == 'dummy') {
                        var intersect = intersects[0];

                        if(set_point === null) {
                            start(intersect, elements);
                        } else  {

                        }
                    }
                }
            }

            document.addEventListener('mousemove', this.events.onDocumentMouseMove, false);
            document.addEventListener('mousedown', this.events.onDocumentMouseDown, false);
        }

        _rotate(elements, intersect) {

            for (let box in helpers_linebox) {
                helpers_linebox[box] = helpers_linebox[box]
            }
            //elements.group.rotation.z = THREE.MathUtils.degToRad(70);
        }

        _move(elements, intersect) {
            helpers_linebox[0].position.set(intersect.point.x, 0, intersect.point.z);
            helpers_linebox[3].position.set(intersect.point.x + 1, 0, intersect.point.z);

            let boxs = elements._rotate(elements, intersect);

            let shape = new THREE.Shape();
            shape.moveTo(boxs[3].position.x, boxs[3].position.z);
            for(let d in boxs) {
                shape.lineTo(boxs[d].position.x, boxs[d].position.z);
            }

            let curve = shape.getPoints();
            elements.line.geometry.setFromPoints(curve);
        }

        _init() {
            scene.add(this.pointer);
            this._events();
        }

        _start(intersect, elements) {
            elements.destroy(elements.pointer, elements.events.onDocumentMouseMove, elements.events.onDocumentMouseDown);

            let box_g = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
            let box_m = new THREE.MeshBasicMaterial({ color: 0x666666 });

            // create cubes and line
            let points = 4;
            let shape = new THREE.Shape();
            shape.moveTo(intersect.point.x + 1, intersect.point.z);
            for(let i = 1; i <= points; i++) {

                let mesh = new THREE.Mesh(box_g, box_m);
                if(i == 1) {
                    mesh.position.set(intersect.point.x, 0, intersect.point.z);
                } else if(i == 2) {
                    mesh.position.set(intersect.point.x, 0, intersect.point.z + 1);
                } else if(i == 3) {
                    mesh.position.set(intersect.point.x + 1, 0, intersect.point.z + 1);
                } else if(i == 4) {
                    mesh.position.set(intersect.point.x + 1, 0, intersect.point.z);
                }
                shape.lineTo(mesh.position.x, mesh.position.z);

                scene.add(mesh);
                helpers_linebox.push(mesh);
            }

            var curve_g = new THREE.BufferGeometry().setFromPoints(shape.getPoints());
            var curve_m = new THREE.LineBasicMaterial({ color: 0xff0000 });
            elements.line = new THREE.Line(curve_g, curve_m);
            elements.line.rotation.x = THREE.MathUtils.degToRad(90);

            scene.add(elements.line);

            elements._events(intersect);
        }

        _end() {}

        _destroy(pointer, onDocumentMouseMove, onDocumentMouseDown) {
            scene.remove(pointer);
            document.removeEventListener('mousemove', onDocumentMouseMove, false);
            document.removeEventListener('mousedown', onDocumentMouseDown, false);
        }
    }

    let coordinates;
    let helpers_linebox = [];
    var pointer = function () {

        let material = new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load("/models/textures/plus.png") });
        let sprite = new THREE.Sprite(material);
        sprite.scale.set(0.4, 0.4, 0.4);

        return sprite;
    }

    $('.js_draw').click(function () {

        let box = new Box(pointer);
    });*/
    /* ----------------- */
    /*class Wall {

        constructor(pointer) {
            this.pointer = pointer();
            this.position;
            this.line;
            this.events = {
                'onDocumentMouseMove': null,
                'onDocumentMouseDown': null,
            }

            this._events('pointer');
        }

        _events(controll, drag_points = []) {
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();

            let elements = {
                'pointer': this.pointer,
                'line': this.line,
                'events': this.events,
                '_events': this._events,
                '_move': this._move,
                '_start': this._start,
                '_end': this._end,
                '_destroy': this._destroy,
            };

            this.events.onDocumentMouseMove = function onDocumentMouseMove(event) {
                event.preventDefault();

                mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
                raycaster.setFromCamera(mouse, camera.camera);

                let intersects = raycaster.intersectObjects([dummy]);
                if (intersects.length > 0 && intersects[0].object.name == 'dummy') {

                    let intersect = intersects[0];
                    if(controll == 'pointer') {
                        scene.add(elements.pointer);
                        elements.pointer.position.copy(intersect.point);
                    } else if(controll == 'line') {
                        elements._move(elements, drag_points, intersect);
                    }
                }
            }
            this.events.onDocumentMouseDown = function onDocumentMouseDown(event) {
                event.preventDefault();
                if(event.which == 1) {

                    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
                    raycaster.setFromCamera(mouse, camera.camera);

                    var intersects = raycaster.intersectObjects([dummy]);
                    if (intersects.length > 0 && intersects[0].object.name == 'dummy') {
                        var intersect = intersects[0];
                        if(controll == 'pointer') {
                            elements._start(elements, intersect);
                        } else if(controll == 'line') {
                            elements._end(elements, intersect);
                        }
                    }
                }
            }

            document.addEventListener('mousemove', this.events.onDocumentMouseMove, false);
            document.addEventListener('mousedown', this.events.onDocumentMouseDown, false);
        }

        _move(elements, drag_points, intersect) {
            drag_points[0].position.set(intersect.point.x, 0, intersect.point.z);

            let shape = new THREE.Shape();
            shape.moveTo(drag_points[0].position.x, drag_points[0].position.z);
            shape.lineTo(drag_points[1].position.x, drag_points[1].position.z);

            let get = shape.getPoints();
            elements.line.geometry.setFromPoints(get);
        }

        _start(elements, intersect) {
            elements._destroy(elements.pointer, elements.events.onDocumentMouseMove, elements.events.onDocumentMouseDown);

            let box_g = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
            let box_m = new THREE.MeshBasicMaterial({ color: 0x666666 });

            let points = 2;
            let shape = new THREE.Shape();
            shape.moveTo(intersect.point.x, intersect.point.z);

            let drag_points = [];
            for(let i = 1; i <= points; i++) {
                let mesh = new THREE.Mesh(box_g, box_m);

                if(i == 1) {
                    mesh.position.set(intersect.point.x, 0, intersect.point.z);
                } else if(i == 2) {
                    mesh.position.set(intersect.point.x, 0, intersect.point.z + 1);
                }

                scene.add(mesh);
                helpers_line.push(mesh);
                drag_points.push(mesh);
            }
            shape.lineTo(intersect.point.x, intersect.point.z + 1);

            var curve_g = new THREE.BufferGeometry().setFromPoints(shape.getPoints());
            var curve_m = new THREE.LineBasicMaterial({ color: 0xff0000 });
            elements.line = new THREE.Line(curve_g, curve_m);
            elements.line.rotation.x = THREE.MathUtils.degToRad(90);

            scene.add(elements.line);
            elements._events('line', drag_points);
        }

        _end(elements, intersect) {

            elements._start(elements, intersect);
        }

        _destroy(pointer, onDocumentMouseMove, onDocumentMouseDown) {
            scene.remove(pointer);
            document.removeEventListener('mousemove', onDocumentMouseMove, false);
            document.removeEventListener('mousedown', onDocumentMouseDown, false);
        }
    }

    let helpers_line = [];
    var pointer = function () {

        let material = new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load("/models/textures/plus.png") });
        let sprite = new THREE.Sprite(material);
        sprite.scale.set(0.4, 0.4, 0.4);

        return sprite;
    }
    $('.js_draw').click(function () {

        let wall = new Wall(pointer);
    });*/

    class Wall {

        constructor(start, end, material, height){
            this.start = start;
            this.end = end;
            this.height = height;
            this.material = material;
            this.mesh3D = null;
            this._create3D();
        }
        _create3D() {
            if(this.start && this.end) {
                var distStartToEnd = this.start.distanceTo(this.end);

                const extrudeSettings = {
                    steps: 1,
                    depth: -0.4,
                    bevelEnabled: true,
                    bevelThickness: 1,
                    bevelSize: 0,
                    bevelOffset: 0,
                    bevelSegments: 0
                };

                var vec2s = [
                    new THREE.Vector2(),
                    new THREE.Vector2(0, this.height),
                    new THREE.Vector2(distStartToEnd, this.height),
                    new THREE.Vector2(distStartToEnd, 0),
                ];
                var shape = new THREE.Shape(vec2s);

                var geo = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
                geo.computeBoundingBox();
                this.mesh3D = new THREE.Mesh(geo, this.material);

                this._alignRotation();
                this._alignPosition();
            }
        }

        _alignRotation() {
            var p1 = this.start.clone();
            var p2 = this.end.clone();
            var direction = new THREE.Vector3();
            direction.subVectors(p2, p1);
            direction.normalize();

            this.mesh3D.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction);
        }

        _alignPosition() {
            if(this.mesh3D){
                this.mesh3D.position.copy(this.start);
            }else {
                throw new Error('mesh3D null');
            }
        }
    }
    class WallCreater {

        constructor() {
            this.positions;
            this.line;
            this.events = {
                'onMouseMove': null,
                'onMouseDown': null
            };
            this.mouse = new THREE.Vector2();
            this.cordinate = new THREE.Vector3();
            this.plane = new THREE.Plane(new THREE.Vector3(0,0,1), 0);
            this.step = 0;
            this.point3ds = [];
            this.helper = [];
            this.elements;
        }

        init() {
            var MAX_POINTS = 100;
            this.positions = new Float32Array(MAX_POINTS * 3);
            var geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

            var material = new THREE.LineBasicMaterial({
                color: 0xff0000,
                linewidth: 2
            });

            this.line = new THREE.Line(geometry, material);
            this.line.position.z = 0;
            scene.add(this.line);

            this._events();
        }

        _events() {
            let raycaster = new THREE.Raycaster();
            let elements = {
                'mouse': this.mouse,
                'cordinate': this.cordinate,
                'positions': this.positions,
                'line': this.line,
                'point3ds': this.point3ds,
                'updateLine': this._updateLine,
                'step': this.step,
                'addPoint': this._addPoint,
                'helper': this.helper,
                'addHelper': this._addHelper,
            };
            this.elements = elements;

            this.events.onMouseMove = function onMouseMove(event) {
                var rect = renderer.domElement.getBoundingClientRect();
                elements.mouse.x = (event.clientX - rect.left) / (rect.right - rect.left) * 2 - 1;
                elements.mouse.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

                raycaster.setFromCamera(elements.mouse, camera.camera);
                let intersects = raycaster.intersectObjects([world]);
                if (intersects.length > 0 && intersects[0].object.name == 'world') {

                    elements.cordinate.set(intersects[0].point.x, 0, intersects[0].point.z);
                    if(elements.step != 0) {
                        elements.updateLine(elements);
                    }
                }
            }

            this.events.onMouseDown = function onMouseDown() {
                elements.addHelper(elements);
            }

            document.addEventListener("mousemove", this.events.onMouseMove, false);
            document.addEventListener('mousedown', this.events.onMouseDown, false);

            wall_helpers_drag.init();
            wall_helpers_drag.wall_helpers_listener(elements);
        }

        _updateLine(elements) {
            elements.positions[elements.step * 3 - 3] = elements.cordinate.x;
            elements.positions[elements.step * 3 - 2] = elements.cordinate.y;
            elements.positions[elements.step * 3 - 1] = elements.cordinate.z;
            elements.line.geometry.attributes.position.needsUpdate = true;
        }

        _addHelper(elements) {
            // Добавляем изначальную точку, чтоб создавалось начальное линия [BEGIN POINT]
            if(elements.step == 0) {
                elements.positions[elements.step * 3 + 0] = elements.cordinate.x;
                elements.positions[elements.step * 3 + 1] = elements.cordinate.y;
                elements.positions[elements.step * 3 + 2] = elements.cordinate.z;

                elements.step++;
                elements.line.geometry.setDrawRange(0, elements.step);
            }

            let box_g = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
            let box_m = new THREE.MeshBasicMaterial({ color: 0x666666 });

            let mesh = new THREE.Mesh(box_g, box_m);
            mesh.userData = elements.step;
            mesh.position.set(elements.cordinate.x, elements.cordinate.y, elements.cordinate.z);
            scene.add(mesh);

            elements.addPoint(elements, mesh);
            elements.helper.push(mesh);
        }

        _addPoint(elements, last_helper) {
            elements.positions[elements.step * 3 + 0] = last_helper.position.x;
            elements.positions[elements.step * 3 + 1] = last_helper.position.y;
            elements.positions[elements.step * 3 + 2] = last_helper.position.z;

            elements.step++;
            elements.line.geometry.setDrawRange(0, elements.step);

            elements.updateLine(elements);
            elements.point3ds.push({
                'step': elements.step - 1, // Отнимаем 1 чтоб вернуться к изначальной точке [BEGIN POINT]
                'cordinate': new THREE.Vector3(elements.cordinate.x, elements.cordinate.y, elements.cordinate.z)
            });
        }

        create3D() {
            if(this.point3ds.length) {

                let mesh3D = new THREE.Mesh();
                scene.add(mesh3D);

                let someMaterial = new THREE.MeshStandardMaterial({color: 0x333333, side: THREE.DoubleSide});

                var index = 1;
                var segmentHeight = 4;
                this.point3ds.forEach( point3d => {
                    if(index < this.point3ds.length){
                        var seg = new Wall(point3d.cordinate, this.point3ds[index].cordinate, someMaterial, segmentHeight);
                        mesh3D.add(seg.mesh3D);
                        index++;

                        building_walls.push(seg.mesh3D);
                    }
                });
            }
        }

        destroy() {
            document.removeEventListener('mousemove', this.events.onMouseMove, false);
            document.removeEventListener('mousedown', this.events.onMouseDown, false);

            if(this.step !== 0 || this.elements.step !== undefined) {
                this.positions[this.elements.step * 3 - 3] = NaN;
                this.positions[this.elements.step * 3 - 2] = NaN;
                this.positions[this.elements.step * 3 - 1] = NaN;
                this.line.geometry.attributes.position.needsUpdate = true;
            }
        }
    }
    class WallHole {

        constructor(holes) {
            this.build_holes =  {
                'arr': holes,
                'calc': function(build, hole) {
                    if(this.arr.length > 0) {
                        let isset = [];
                        for(let key in this.arr) {
                            isset.push(this.arr[key].build.uuid);
                        }
                        if(isset.indexOf(build.uuid) == -1) {
                            this.arr.push({
                                'build': build,
                                'holes': [hole],
                            });
                        } else {
                            for(let key in this.arr) {
                                if(this.arr[key].build.uuid == build.uuid) {
                                    this.arr[key].holes.push(hole);
                                }
                            }
                        }
                    } else {
                        this.arr.push({
                            'build': build,
                            'holes': [hole],
                        });
                    }
                }
            };
            this.builds = null;
            this.holes = [];
            this.hole = null;
            this.hole_raise = null;
            this.events = {
                'onMouseMove': null,
                'onMouseDown': null,
            };
            this.elements = null;
        }

        init(building, hole, raise) {
            this.destroy();
            this.builds = building;

            let geo = new THREE.BoxBufferGeometry(
                hole.data('parameter').width,
                hole.data('parameter').height,
                0.25
            );
            this.hole = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: "red", transparent: true, opacity: 0.4}));
            this.hole.name = hole.data('parameter').name;
            this.hole.position.set(camera.camera.getWorldDirection());
            scene.add(this.hole);

            this.hole_raise = (hole.data('parameter').height/2) + Number(raise);
            this._events();
        }

        _events() {
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();
            let normalMatrix = new THREE.Matrix3();
            let worldNormal = new THREE.Vector3();
            let intersects;

            let elements = {
                'build_holes': this.build_holes,
                'builds': this.builds,
                'holes': this.holes,
                'hole': this.hole,
                'hole_raise': this.hole_raise,
                'events': this.events,
                'destroy': this.destroy
            };
            this.elements = elements;

            elements.events.onMouseMove = function(event) {
                let rect = renderer.domElement.getBoundingClientRect();
                mouse.x = (event.clientX - rect.left) / (rect.right - rect.left) * 2 - 1;
                mouse.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

                raycaster.setFromCamera(mouse, camera.camera);
                intersects = raycaster.intersectObjects(elements.builds);
                if (intersects.length != 0) {
                    normalMatrix.getNormalMatrix(intersects[0].object.matrixWorld);
                    worldNormal.copy(intersects[0].face.normal).applyMatrix3(normalMatrix).normalize();

                    elements.hole.position.copy(intersects[0].point.setY(elements.hole_raise));
                    elements.hole.lookAt(new THREE.Vector3().copy(intersects[0].point.setY(elements.hole_raise)).add(worldNormal));
                }
            }

            elements.events.onMouseDown = function() {
                let current_build = intersects[0].object;
                let hole = elements.hole.clone(); hole.material = new THREE.MeshBasicMaterial({color: "red"}); scene.add(hole);

                elements.holes.push(hole);
                elements.build_holes.calc(current_build, hole);
                elements.destroy();
            }

            document.addEventListener("mousemove", elements.events.onMouseMove, false);
            document.addEventListener("mousedown", elements.events.onMouseDown, false);

            hole_drag.init();
            hole_drag.holes_listener(elements);
        }

        makeAHole() {
            for(let b in build_holes) {
                let build_box = build_holes[b].build.geometry.boundingBox.getSize();
                let build = build_holes[b].build;

                let width = build_box.x * 0.5;
                let height = build_box.y * 0.5;
                let depth = build_box.z * 0.5;

                let shape = new THREE.Shape();
                shape.moveTo(-width, height);
                shape.lineTo(-width, -height);
                shape.lineTo(width, -height);
                shape.lineTo(width, height);
                shape.lineTo(-width, height);

                for(let h in build_holes[b].holes) {
                    let holes = build_holes[b].holes[h];

                    let pointAtWall = holes.position.clone();
                    build.worldToLocal(pointAtWall);

                    let wWidth = holes.geometry.parameters.width * 0.5;
                    let wHeight = holes.geometry.parameters.height * 0.5;

                    let hole_path = new THREE.Shape();
                    hole_path.moveTo((pointAtWall.x - width) - wWidth, (pointAtWall.y - height) + wHeight);
                    hole_path.lineTo((pointAtWall.x - width) - wWidth, (pointAtWall.y - height) - wHeight);
                    hole_path.lineTo((pointAtWall.x - width) + wWidth, (pointAtWall.y - height) - wHeight);
                    hole_path.lineTo((pointAtWall.x - width) + wWidth, (pointAtWall.y - height) + wHeight);
                    hole_path.lineTo((pointAtWall.x - width) - wWidth, (pointAtWall.y - height) + wHeight);

                    shape.holes.push(hole_path);
                }

                var extrudeSettings = {
                    amount: depth * 2,
                    bevelEnabled: false
                };
                var extrudeGeometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
                extrudeGeometry.translate(width, height, -depth * 2);
                build.geometry.dispose();
                build.geometry = extrudeGeometry;

                // remove holes
                for(let h in build_holes[b].holes) {
                    scene.remove(build_holes[b].holes[h]);
                }

                // Remove Drag holes
                hole_drag.destroy();
            }
        }

        destroy() {
            if(this.hole !== null) {
                scene.remove(this.hole);

                document.removeEventListener('mousemove', this.events.onMouseMove, false);
                document.removeEventListener('mousedown', this.events.onMouseDown, false);
            }
        }

        remove_hole() {
            let object = hole_drag.transform.object;

            for(let build in this.elements.build_holes.arr) {
                for(let holes in this.elements.holes) {
                    if(this.elements.holes[holes].uuid == object.uuid) {
                        this.elements.holes.splice(holes, 1);
                        scene.remove(object);

                        this.elements.build_holes.arr[build].holes.splice(holes, 1);
                    }
                }
            }

            hole_drag.destroy();
        }
    }

    // Рисуем стену
    let wall = new WallCreater();
    let wall_helpers_drag = new Drag(wall.helper);
    wall_helpers_drag.wall_helpers_listener = function (elements) {
        this.transform.addEventListener('objectChange', function () {

            elements.positions[this.object.userData * 3 - 3] = this.object.position.x;
            elements.positions[this.object.userData * 3 - 2] = this.object.position.y;
            elements.positions[this.object.userData * 3 - 1] = this.object.position.z;
            elements.line.geometry.attributes.position.needsUpdate = true;

            for(let key in elements.point3ds) {
                if(elements.point3ds[key].step == this.object.userData) {
                    elements.point3ds[key].cordinate = new THREE.Vector3(this.object.position.x, this.object.position.y, this.object.position.z);
                }
            }
        })
    };
    $('.js_draw').click(function () {

        wall.init();
    });
    $('.js_extrude').click(function () {
        wall.create3D();
    });

    // Высекаем стену
    let build_holes = [];
    let hole = new WallHole(build_holes);
    let hole_drag = new Drag(hole.holes);
    hole_drag.holes_listener = function (elements) {
        this.transform.addEventListener('objectChange', function () {
            console.log(114);
        });
    };
    $('.js_hole').click(function (e) {

        let get_hole = $(e.target).closest('.wall_hole').find('select').find('option:selected');
        let get_raise = $(e.target).closest('.wall_hole').find('input[name="raise"]').val();

        hole.init(building_walls, get_hole, get_raise);
    });
    $('.js_hole_make').click(function (e) {

        hole.makeAHole();
    });

    document.addEventListener('keydown', function (event) {
        if(event.keyCode == 27) {
            drag.destroy();
            wall.destroy();
            wall_helpers_drag.destroy();
            hole.destroy();
        }
    }, false);

    document.addEventListener('keydown', function (event) {
        if(event.keyCode == 8) {
            hole.remove_hole();
        }
    }, false);

    //
    /*var vec2s = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 4),
        new THREE.Vector2(2, 4),
        new THREE.Vector2(2, 0)
    ];
    var shape = new THREE.Shape(vec2s);
    var geo = new THREE.ShapeGeometry(shape);

    let someMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide, transparent: true, opacity:0.3});
    let mesh3D = new THREE.Mesh(geo, someMaterial);
    mesh3D.position.x = -4;
    scene.add(mesh3D);*/

    //
    /*const extrudeSettings = {
        steps: 1,
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
    };

    const heartShape = new THREE.Shape(vec2s);
    const geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);

    const mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
    scene.add(mesh);*/

    /*let positions = new Float32Array([-1.4648921489715576, 0, -2.58066725730896, 3.360517978668213, 0, -2.58066725730896, 4.104445457458496, 0, -3.562267303466797, -1.6428800821304321, 0, 1.5893481969833374, -1.932550311088562, 0, 1.0328019857406616]);
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
    });

    let line = new THREE.Line(geometry, material);
    scene.add(line);

    positions[0] = -3.666323184967041;
    positions[2] = -2.949087142944336;
    line.geometry.attributes.position.needsUpdate = true;
    line.geometry.setDrawRange(0, 5);

    console.log(line.geometry);*/

    /*let m_geo = new THREE.BoxBufferGeometry(1, 1, 1);
    let m_test = new THREE.Mesh(m_geo, new THREE.MeshBasicMaterial({color: "gray", transparent: true, opacity: 0.4}));
    m_test.position.set(-4, 0, -6);
    scene.add(m_test);
    let geo = new THREE.BoxBufferGeometry(2, 2, 2);
    let test = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: "red", transparent: true, opacity: 0.4}));
    test.quaternion.setFromUnitVectors(m_test.position, new THREE.Vector3(7, 0, -4))
    scene.add(test);
    console.log(test.position);*/
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
    //modelObjects();
    //loadModel();
    test_math();
    test_core();
    //test_helpers();
    //test_objects();
    //test_material();
    print_scene();

    // Raycaster
    window.addEventListener('mousemove', function (e) {
        raycaster.func(e)
    }, false);

    // Этот метод лучше. Он рабоатет и обычном браузере и VR
    renderer.setAnimationLoop(() => {

        // update the picking ray with the camera and mouse position
        raycaster.cast.setFromCamera(raycaster.mouse, camera.camera);

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
