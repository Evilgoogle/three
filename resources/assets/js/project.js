import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { WEBGL } from './three/webTest';
import {DirectGeometry} from "three";

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
    //scene.background = new THREE.Color('skyblue');
}

function modelLight() {

    function room_lightes() {
        // --> Прямой источник света
        light.directLight = new THREE.DirectionalLight(0xffffff, 5.0);
        light.directLight.position.set(1, 10, 10);

        // --> Окружающий источник света
        light.lightAmb = new THREE.AmbientLight(0xffffff, 0.8);
        light.lightAmb.position.set(0, 2.7, 0);
        scene.add(light.lightAmb);

        // --> Сферический источник света
        light.sphereLight = new THREE.HemisphereLight(
            0xddeeff,
            0x202020,
            5,
        );
        light.sphereLight.position.set(5, 10, 5);

        // --> Прямоуголный источник света
        let width = 3.2;
        let height = 2.33;
        let intensity = 8;

        RectAreaLightUniformsLib.init();
        let rectLight = new THREE.RectAreaLight(0xffffff, intensity,  width, height);
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
        rectLight.add( rectLightMesh );

        // --> Прожекторный свет
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

        let specularmap = null; // Уровень металичности материала. Применяем его если у нас есть метал.
        if(typeof map['specularmap'] !== "undefined") {
            specularmap = textureLoader.load(map.metalnessmap, undefined, undefined, error => onError(error));
            specularmap.encoding = THREE.sRGBEncoding;
            specularmap.anisotropy = 8; // Четкость
            specularmap.flipY = false;
        }

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
        } else if(material_type == 'mesh') {
            return new THREE.MeshBasicMaterial({
                color: color,
                map: bitmap,
            });
        } else if(material_type == 'pong') {
            return new THREE.MeshPhongMaterial({
                specular: 0x222222,
                shininess: 35,
                map: map,
                specularMap: specularmap,
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

                let geometry = new THREE.ShapeBufferGeometry(shapes);
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

        /*var curve = new THREE.LineCurve( // создаем линию
            new THREE.Vector2(1, 0),
            new THREE.Vector2(3, 4),
        );*/

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

        var curve = new THREE.SplineCurve([ // Тоже самое что CatmullRomCurve3 создает произвольгую линию, но тольков xy кординатах
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 5, -5 ),
            new THREE.Vector2( 10, 0 )
        ]);

        var points = curve.getPoints(50); // Точки в кординате с добавленными 50 точками для округление
        //console.log(curve.getLength()); // Получаем общую длину кривой
        //console.log(curve.getTangent(20)); // получается xyz для чего не понятно

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color : 0xff0000 });
        var line = new THREE.Line(geometry, material);
        scene.add(line);
    }

    //clock();
    //bufferGeometry();
    set_raycaster();
    //curve()
    font();
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
    modelLight();
    modelCamera(type_camera);
    modelObjects();
    loadModel();
    test_math();
    test_core();
    modelRender();

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