/**
 * This file is emulating Certification data coming from a database (or firebase). It is read by
 * the data repository.
 * Note: This contains characters/strings that should really be HTML entities, such as "@reg;"
 *       instead of "®", but I couldn't get the application to render them properly, so I'm leaving
 *       them for now.
 *
 * @type {*[]}
 */
var certificationJson = [
  {
    "name": "FAIRTRADE® Certification Mark and FAIRTRADE® Program Mark",
    "headingUrl": "https://www.fairtrade.net/",
    "paragraphs": [
      "The FAIRTRADE® Certification Mark from Fairtrade International is the oldest and appears on about 80% of the world’s fair trade products. Products with the label have 20% or more fair trade content; in addition, all ingredients that can be sourced on fair trade terms must be. Single ingredient products with the label must have 100% fair trade content. Along with food and drink items, Fairtrade International certifies fair trade cotton, flowers, gold and sports balls.",
      "Fairtrade International has a FAIRTRADE® Program Mark for cocoa, sugar and cotton. The cocoa, sugar and cotton programs enable companies who don’t have certified composite products to still commit to buying slavery- free cocoa, sugar or cotton. These display the FAIRTRADE Cocoa Program™, FAIRTRADE Sugar Program™ or FAIRTRADE Cotton Program™ labels."
    ],
    "images": [
      "https://s3.amazonaws.com/infogram-themes/10951/logo.png",
      "https://images.fairtrade.net/article/FM_RGB_100H.png",
      "https://images.fairtrade.net/article/FSPMarks_ThreeUp_fromWord.png"
    ]
  },
  {
    "name": "Cert2",
    "paragraphs": [
      "Test certificate 2"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/end-slavery-now-test.appspot.com/o/Product%2Fimages%2Fa4hf8Ru07DI.jpg?alt=media&token=720c65ce-1e14-4618-9843-ca22840aad67",
      "https://firebasestorage.googleapis.com/v0/b/end-slavery-now-test.appspot.com/o/Product%2Fimages%2FITe2NVbfefc.jpg?alt=media&token=ab8243b0-3873-450b-b78f-f50f93e3c09e"
    ]
  }
]
;
