import { loadStaticRecords } from "../src/data/static-repository";

const records = loadStaticRecords();
console.log(`Valid content: ${records.books.length} books, ${records.collections.length} collections, ${records.assets.length} assets, ${records.readers.length} readers`);
