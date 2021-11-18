const config = {
    app_name: 'Logo Pabrik Roti - Rarity',
    app_description: 'Logo Pabrik Roti - rarity score calculation base on the ERC721 smart contract and the NFT metadata.',
    collection_file_name: 'rotilogo-collection.json',
    collection_contract_address: 'matic/0x6710E0f18270bE32F9590503E306997B3162B83e',
    collection_name: 'Logo Pabrik Roti',
    collection_description: 'Logo Pabrik Roti is the Logo of The Breads Factory, an NFT project by [PabrikRoti.IDN](https://linktr.ee/pabrikroti.idn) in Polygon (Matic) blockchain which is also termed as The Breads Factory: Logo 10k.',
    collection_id_from: 1,
    ignore_traits: ['date'], 
    sqlite_file_name: 'database.sqlite',
    ga: '',
    main_og_image: 'https://rotilogo-rarity.herokuapp.com/og.png',
    item_path_name: 'virus',
    page_item_num: 24,
    content_image_is_video: false,
    content_image_frame: 'circle', // circle, rectangle
    use_wallet: false
};

module.exports = config;