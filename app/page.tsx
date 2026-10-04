import Link from "next/link";
import { books, loadStaticRecords } from "@/data/static-repository";
import { BookCard } from "@/components/catalogue/book-card";

export default async function HomePage() {
  const [collections, published] = await Promise.all([books.listCollections(), books.listBooks()]);
  const { assets } = loadStaticRecords();
  const covers = new Map(assets.map((asset) => [asset.id, asset]));
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">An open door to stories</p>
          <h1 id="hero-title">A library<br /><em>to enter.</em></h1>
          <p>Explore the shelves. Open a book. Stay as long as the story asks.</p>
          <a className="button" href="#books">Browse books <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-book" aria-hidden="true"><div className="hero-book-cover"><span>THE<br />LIBRARY<br />WITHIN</span><small>✦ &nbsp; KITABS &nbsp; ✦</small></div></div>
      </section>
      <section className="content-section" id="collections" aria-labelledby="collections-title">
        <div className="section-heading"><p className="eyebrow">Explore</p><h2 id="collections-title">Collections</h2></div>
        {collections.length ? <ul className="collection-list">{collections.map((collection) => <li key={collection.id}><Link href={`/collections/${collection.slug}/`}><strong>{collection.title}</strong><span>{collection.description}</span></Link></li>)}</ul> : <p className="empty-state">The shelves are being prepared. Rights-cleared collections will appear here.</p>}
      </section>
      <section className="content-section" id="books" aria-labelledby="books-title">
        <div className="section-heading"><p className="eyebrow">Discover</p><h2 id="books-title">The books</h2></div>
        {published.length ? <div className="book-grid">{published.map((book) => <BookCard key={book.id} book={book} cover={covers.get(book.coverAssetId)!} />)}</div> : <p className="empty-state">No books are published yet. The opening collection is being checked for reading and distribution rights.</p>}
      </section>
    </main>
  );
}
