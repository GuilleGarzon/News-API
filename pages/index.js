import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import styles from '../styles/Home.module.css';

export default function Home({ articles }) {
  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos artículos</p>}
        {articles.length > 0 &&
          articles.map((article) => (
            <article key={article.title}>
              <Image
                alt={`Image for the article ${article.title}`}
                src={article.urlToImage}
                width={450}
                height={300}
                layput="responsive"
                quality={50}
                priority={true}
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>
          ))}
      </div>
    </PageLayout>
  );
}

// N requests -> se ejecuta 1 vez en build time (o para refrescar la página)
// export async function getStaticProps() {
//   const response = await fetch(
//     'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0f7b8ee17f1f4274b0cee7ae9cd919ed'
//   );
//   const { articles } = await response.json();
//   return {
//     props: {
//       articles,
//     },
//   };
// }

// N requests -> se ejecuta N veces
// para datos que necesites que sean MUY live
// tiene demasiados datos dinámicos
export async function getServerSideProps(context) {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0f7b8ee17f1f4274b0cee7ae9cd919ed'
  );
  const { articles } = await response.json();
  return {
    props: {
      articles,
    },
  };
}
