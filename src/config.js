const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.sol;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  
  {
    growEditionSizeTo:0,
    layersOrder: [
      { name: "Skin_man" 
    },//5
      { name: "Face_man" },
      { name: "Expression_man" },
      { name: "Clothing_man" },//10
      { name: "HaircutMan1"},
    ],
  },
  {
    growEditionSizeTo:5,
    layersOrder: [
      { name: "HairBackground" },
      { name: "HairBlank" },
      { name: "HairLine" },
    ],
  },

  // {
  //   growEditionSizeTo: 80,
  //   layersOrder: [
  //     { name: "Skin_man"
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 120,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本2"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 160,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本3"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 200,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本4"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 240,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本5"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 280,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本6"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 320,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本7"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 360,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本8"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 400,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本9"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 440,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本10"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 480,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本11"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 520,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本12"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 560,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本13"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 600,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本14"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 640,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本15"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 680,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本16"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 720,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本17"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 760,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" },
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本18"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 800,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本19"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 840,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本20"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 880,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本21"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 920,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本22"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 960,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本23"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1000,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本24"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1040,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本25"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1080,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本26"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1120,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本27"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1160,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本28"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1200,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本29"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1240,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本30"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1280,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本31"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1320,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本32"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1360,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本33"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1400,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本34"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1440,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本35"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1480,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本36"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1520,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本37"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1560,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本38"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1600,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本39"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1640,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本40"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1680,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本41"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1720,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本42"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1760,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本43"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1800,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本44"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1840,
  //   layersOrder: [
  //     { name: "Skin_man"
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本45"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1880,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本46"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1920,
  //   layersOrder: [
  //     { name: "Skin_man"
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本47"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 1960,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本48"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2000,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本49"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2040,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本50"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2080,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本51"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2120,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本52"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2160,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本53"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2200,
  //   layersOrder: [
  //     { name: "Skin_man" 
  //   },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本54"},
  //   ],
  // },
  // {
  //   growEditionSizeTo: 2240,
  //   layersOrder: [
  //     { name: "Skin_man" },//5
  //     { name: "Face_man" },
  //     { name: "Expression_man" ,
  //     options:{
  //       bypassDNA:false
  //     }},
  //     { name: "Clothing_man" },//10
  //     { name: "HaircutMan1的副本55"},
  //   ],
  // },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 2048,
  height: 2048,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
