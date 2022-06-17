const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
} = require(`${basePath}/src/config.js`);
//画板宽高
const canvas = createCanvas(format.width, format.height);
//画板用2d环境
const ctx = canvas.getContext("2d");
//是否用滤镜
ctx.imageSmoothingEnabled = format.smoothing;
//元数据数组
var metadataList = [];
//attribute数组
var attributesList = [];
//dnaList集合
var dnaList = new Set();
const DNA_DELIMITER = "-";
//初始化giffer为null
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);
let hashlipsGiffer = null;
//创建文件
const buildSetup = () => {
  //停止正在读build文件的线程
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  if (gif.export) {
    fs.mkdirSync(`${buildDir}/gifs`);
  }
};
//获取权重
const getRarityWeight = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  //读取权重
  var nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );
  //没有权重则设置为1
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};
//0:Black#1.png=>0
const cleanDna = (_str) => {
  //去掉询问字符串
  const withoutOptions = removeQueryStrings(_str);
  //获得dna数字
  var dna = Number(withoutOptions.split(":").shift());
  return dna;
};
//获得图片文件名字
//Black#1.png=>Black
const cleanName = (_str) => {
  //切掉png
  let nameWithoutExtension = _str.slice(0, -4);
  //返回#分割的第一个字符串
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};
//从文件中获取元素
//某个path例子/Users/dev/hashlips_art_engine/layers/Background/
//筛选规则:.之前要有除了/之外的任意符号
//某个返回对象
// {
//   id: 0,
//   name: 'Black',
//   filename: 'Black#1.png',
//   path: '/Users/dev/hashlips_art_engine/layers/Background/Black#1.png',
//   weight: 1
// }
const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      if (i.includes("-")) {
        throw new Error(`layer name can not contain dashes, please fix: ${i}`);
      }
      return {
        id: index,
        name: cleanName(i),
        filename: i,
        path: `${path}${i}`,
        weight: getRarityWeight(i),
      };
    });
};
//设置层元素属性
const layersSetup = (layersOrder) => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    //根据是否有displayName设置名字
    name:
      layerObj.options?.["displayName"] != undefined
        ? layerObj.options?.["displayName"]
        : layerObj.name,
    //根据是否有blend增加一些颜色特效
    blend:
      layerObj.options?.["blend"] != undefined
        ? layerObj.options?.["blend"]
        : "source-over",
    //透明度
    opacity:
      layerObj.options?.["opacity"] != undefined
        ? layerObj.options?.["opacity"]
        : 1,
    //是否检查相同的DNA
    bypassDNA:
      layerObj.options?.["bypassDNA"] !== undefined
        ? layerObj.options?.["bypassDNA"]
        : false,
  }));
  return layers;
};

const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};
//画背景
const drawBackground = () => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};
//添加元数据
const addMetadata = (_dna, _edition) => {
  let dateTime = Date.now();
  //先录入一部分数据
  let tempMetadata = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    dna: sha1(_dna),
    edition: _edition,
    date: dateTime,
    ...extraMetadata,
    attributes: attributesList,
    compiler: "HashLips Art Engine",
  };
  //如果是solana
  if (network == NETWORK.sol) {
    tempMetadata = {
      //Added metadata for solana
      name: tempMetadata.name,
      symbol: solanaMetadata.symbol,
      description: tempMetadata.description,
      //Added metadata for solana
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `${_edition}.png`,
      //Added metadata for solana
      external_url: solanaMetadata.external_url,
      edition: _edition,
      ...extraMetadata,
      attributes: tempMetadata.attributes,
      properties: {
        files: [
          {
            uri: `${_edition}.png`,
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  metadataList.push(tempMetadata);
  attributesList = [];
};
//添加属性
const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};
//
const loadLayerImg = async (_layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const addText = (_sig, x, y, size) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  text.only
    ? addText(
        `${_renderObject.layer.name}${text.spacer}${_renderObject.layer.selectedElement.name}`,
        text.xGap,
        text.yGap * (_index + 1),
        text.size
      )
    : ctx.drawImage(
        _renderObject.loadedImage,
        0,
        0,
        format.width,
        format.height
      );

  addAttributes(_renderObject);
};
//返回
const constructLayerToDna = (_dna = "", _layers = []) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer.elements.find(
      (e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index])
    );
    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

/**
 * In some cases a DNA string may contain optional query parameters for options
 * such as bypassing the DNA isUnique check, this function filters out those
 * items without modifying the stored DNA.
 *
 * @param {String} _dna New DNA string
 * @returns new DNA string with any items that should be filtered, removed.
 */
//过滤DNA字符串
const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    //exec方法返回匹配的实例数组，如果没有匹配返回null
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);
    return options.bypassDNA;
  });
  return filteredDNA.join(DNA_DELIMITER);
};

/**
 * Cleaning function for DNA strings. When DNA strings include an option, it
 * is added to the filename with a ?setting=value query string. It needs to be
 * removed to properly access the file name before Drawing.
 *
 * @param {String} _dna The entire newDNA string
 * @returns Cleaned DNA string without querystring parameters.
 */
const removeQueryStrings = (_dna) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};
//DNA判重，看集合中是否存在过滤后的DNA
const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  console.log(_dna);
  const _filteredDNA = filterDNAOptions(_dna);
  console.log(_dna);
  return !_DnaList.has(_filteredDNA);
};
//随机生成图片DNA
//例如：0:Black#1.png-1:White#50.png-4:Red#1.png-1:Medium#20.png-
// 0:Shapes#100.png-0:High#20.png-0:High#30.png
//layers的前两个layer
// [
//   {
//     id: 0,
//     elements: [ [Object] ],
//     name: 'Background',
//     blend: 'source-over',
//     opacity: 1,
//     bypassDNA: false
//   },
//   {
//     id: 1,
//     elements: [ [Object], [Object] ],
//     name: 'Eyeball',
//     blend: 'source-over',
//     opacity: 1,
//     bypassDNA: false
//   }
// ]
const createDna = (_layers) => {
  let randNum = [];
  _layers.forEach((layer) => {
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    // number between 0 - totalWeight
    // console.log("totalWeight:" + totalWeight);
    let random = Math.floor(Math.random() * totalWeight);
    // console.log("原初random:" + random);
    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;
      // console.log("减了" + (i + 1) + "次的random:" + random);
      if (random < 0) {
        // console.log(`${layer.elements[i].id}:${layer.elements[i].filename}${
        //   layer.bypassDNA ? "?bypassDNA=true" : ""
        // }`);
        // 2:Middle#50.png
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        );
      }
    }
  });
  // console.log(randNum);
  // [
  //   '0:Black#1.png',
  //   '0:Red#50.png',
  //   '1:Green#1.png',
  //   '2:Small#60.png',
  //   '0:Shapes#100.png',
  //   '2:Middle#40.png',
  //   '2:Middle#50.png'
  // ]
  // console.log(randNum.join(DNA_DELIMITER));
  return randNum.join(DNA_DELIMITER);
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

const saveMetaDataSingleFile = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.edition == _editionCount);
  debugLogs
    ? console.log(
        `Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`
      )
    : null;
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
//开始制造
const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  //理论上需要的的index数组
  let abstractedIndexes = [];
  //sol的NFT从0开始，eth的从1开始，以最后的growEditionSizeTo为结束
  //向abstractedIndexes数组中加入值
  for (
    let i = network == NETWORK.sol ? 0 : 1;
    i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }
  //如果shuffleLayerConfigurations为true，则生成的数字随机排列
  if (shuffleLayerConfigurations) {
    abstractedIndexes = shuffle(abstractedIndexes);
  }
  //是否开启debug日志
  debugLogs
    ? console.log("Editions left to create: ", abstractedIndexes)
    : null;
  //配置每一层的属性
  while (layerConfigIndex < layerConfigurations.length) {
    const layers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder
    );
    //如果小于等于当前层最大制造数，就开始制造图片
    while (
      editionCount <= layerConfigurations[layerConfigIndex].growEditionSizeTo
    ) {
      //根据图层的集合layers生成dna，并从DNAList中查找判断是否重复
      // console.log(layers);

      let newDna = createDna(layers);

      if (isDnaUnique(dnaList, newDna)) {
        let results = constructLayerToDna(newDna, layers);
        let loadedElements = [];

        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          debugLogs ? console.log("Clearing canvas") : null;
          ctx.clearRect(0, 0, format.width, format.height);
          if (gif.export) {
            hashlipsGiffer = new HashlipsGiffer(
              canvas,
              ctx,
              `${buildDir}/gifs/${abstractedIndexes[0]}.gif`,
              gif.repeat,
              gif.quality,
              gif.delay
            );
            hashlipsGiffer.start();
          }
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject, index) => {
            drawElement(
              renderObject,
              index,
              layerConfigurations[layerConfigIndex].layersOrder.length
            );
            if (gif.export) {
              hashlipsGiffer.add();
            }
          });
          if (gif.export) {
            hashlipsGiffer.stop();
          }
          debugLogs
            ? console.log("Editions left to create: ", abstractedIndexes)
            : null;
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
              newDna
            )}`
          );
        });
        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
        console.log("DNA exists!");
        failedCount++;
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
          );
          process.exit();
        }
      }
    }
    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

module.exports = { startCreating, buildSetup, getElements };
