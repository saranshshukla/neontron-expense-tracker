// src/components/Books.jsx
import React, { useState } from 'react';

// Sample data: 15 books with cover, title, author, description, and purchase link
const books = [
  // Keep first 4 books with original Amazon covers
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    description: 'A guide to financial literacy and investing mindset.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg',
    url: 'https://www.amazon.in/Rich-Dad-Poor-Middle-Anniversary/dp/1612681131/ref=sr_1_3?crid=3V84T91O64Y0G&dib=eyJ2IjoiMSJ9.A2LH2c1HrvqSF7BgNRdd0yCrXirJh5xLquBGv7mskwKVWlOXMwVOGSjrVMyRXRxJmOPO0-5YiHOZQdIQstMveCNmHWx7_cqHIEiusCNCyHFy-VyaP3tK50lPCveCwM62HjcB3ry6oWSe5RWiDONonVuwikl7X4zMTBZQ4wHO8s6AvCUD7iD3Gj9E62ZA6vLYB4xAaTuszNLN3ujSOIctMftxpdmjjdvot6k3H01MUEQ.hjfjjXn3DiRyvL7Zh9ZdBDBD3q_1yGrsnGhk4pm2FNE&dib_tag=se&keywords=rich+dad+poor+dad+book+in+english&qid=1749571419&s=books&sprefix=rich+dad+%2Cstripbooks%2C331&sr=1-3',
  },
  {
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    description: 'A classic book on value investing and market philosophy.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/91uwocAMtSL.jpg',
    url: 'https://www.amazon.in/dp/0062312685',
  },
  {
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    description: 'Timeless principles of personal achievement and wealth.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/71UypkUjStL.jpg',
    url: 'https://www.amazon.in/dp/1585424331',
  },
  {
    title: 'Principles by Ray Dalio',
    author: 'Ray Dalio',
    description: 'Life and work principles from one of the world’s top investors.',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg',
    url: 'https://www.amazon.in/dp/1501124021',
  },

  // Replace rest with Open Library covers (ISBN based)
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'How people think about money and investing.',
    cover: 'https://m.media-amazon.com/images/I/41PFYq5BJbL._SY445_SX342_.jpg',
    url: 'https://www.amazon.in/dp/9390166268',
  },
  {
    title: 'Your Money or Your Life',
    author: 'Vicki Robin',
    description: 'Transforming your relationship with money and achieving financial independence.',
    cover: 'https://covers.openlibrary.org/b/isbn/9780143115762-L.jpg',
    url: 'https://www.amazon.in/dp/0143115766',
  },
  {
    title: 'The Millionaire Next Door',
    author: 'Thomas J. Stanley',
    description: 'Surprising secrets of America’s wealthy.',
    cover: 'https://covers.openlibrary.org/b/isbn/9781589795471-L.jpg',
    url: 'https://www.amazon.in/dp/1589795474',
  },
  {
    title: 'I Will Teach You to Be Rich',
    author: 'Ramit Sethi',
    description: 'A practical guide to personal finance and investing.',
    cover: 'https://covers.openlibrary.org/b/isbn/9780761147480-L.jpg',
    url: 'https://www.amazon.in/dp/0761147489',
  },
  {
    title: 'The Little Book of Common Sense Investing',
    author: 'John C. Bogle',
    description: 'Simple investment strategies for long-term success.',
    cover: 'https://m.media-amazon.com/images/I/51wvE48u69L._SY445_SX342_.jpg',
    url: 'https://www.amazon.in/Little-Book-Common-Sense-Investing-ebook/dp/B075Z6HSCJ/ref=sr_1_1_sspa?crid=J2MS8UYPB29M&dib=eyJ2IjoiMSJ9.TeynDOMdH_s_5IBkjPi3wjHVTeI4dhTercK48GhzU5Xtxz8g1CHCQ6eN9ED8v05gJPyZ-vjYyiPu3lCVBetATcpjzUYTbtfSqhrZHZC31iAQlSCrMVfaoTrY7zrNlGlJ478FB-Fx4WCRPXhQYVIjactdhHCkudiLpnHWCOvl8Sp6z4eXCAWmr-Q40z4BQOaCSLKM9oADrCUGQzQZIrN28Kw3_vqi8-7T2Ibh1PRmfyw.z9v3xf1gtyHZrFUN82ean5-Rs-alIG1yaXSgut5VMqc&dib_tag=se&keywords=the+little+book+of+common+sense+investing&qid=1749570833&s=books&sprefix=the+little+b%2Cstripbooks%2C437&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1',
  },
  {
    title: 'Financial Freedom',
    author: 'Grant Sabatier',
    description: 'A proven path to wealth and a rich life.',
    cover: 'https://m.media-amazon.com/images/I/71XTfxizAvL._SY425_.jpg',
    url: 'https://www.amazon.in/Financial-Freedom-Proven-Path-Money/dp/0525540881',
  },
  {
    title: 'The Total Money Makeover',
    author: 'Dave Ramsey',
    description: 'A step-by-step plan for financial fitness.',
    cover: 'https://covers.openlibrary.org/b/isbn/9781595555274-L.jpg',
    url: 'https://www.amazon.in/dp/1595555277',
  },
  {
    title: 'The Barefoot Investor',
    author: 'Scott Pape',
    description: 'Simple strategies to take control of your money.',
    cover: 'https://m.media-amazon.com/images/I/51eb2KXvd3L._SX342_SY445_.jpg',
    url: 'https://www.amazon.in/Barefoot-Investor-Money-Guide-You%E2%80%B2ll/dp/0730324214',
  },
  {
    title: 'Money Master the Game',
    author: 'Tony Robbins',
    description: '7 simple steps to financial freedom.',
    cover: 'https://covers.openlibrary.org/b/isbn/9781476757803-L.jpg',
    url: 'https://www.amazon.in/dp/1476757801',
  },
  {
    title: 'The Richest Man in Babylon',
    author: 'George S. Clason',
    description: 'Ancient wisdom on wealth building.',
    cover: 'https://m.media-amazon.com/images/I/71VlJWL2rhL._SY425_.jpg',
    url: 'https://www.amazon.in/dp/1505339111',
  },
  {
    title: 'Secrets of the Millionaire Mind',
    author: 'T. Harv Eker',
    description: 'Mastering the inner game of wealth.',
    cover: 'https://covers.openlibrary.org/b/isbn/9780060763282-L.jpg',
    url: 'https://www.amazon.in/dp/0060763280',
  },
];


export default function Books() {
  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Top Investment & Finance Books</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
          gap: 20,
        }}
      >
        {books.map((book, idx) => (
          <div
            key={idx}
            style={{
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05) rotateX(5deg) rotateY(5deg)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          >
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', cursor: 'pointer', overflow: 'hidden' }}
            >
              <img
                src={book.cover}
                alt={book.title}
                style={{ width: '100%', height: 400, objectFit: 'cover', transition: 'transform 0.3s ease' }}
                loading="lazy"
              />
            </a>
            <div style={{ padding: 16, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: 8,
                  userSelect: 'none',
                  textAlign: 'center',
                }}
              >
                {book.title}
              </div>
              <p style={{ fontStyle: 'italic', margin: '0 0 8px 0', color: '#555', textAlign: 'center' }}>
                by {book.author}
              </p>
              <p style={{ flexGrow: 1, fontSize: 14, color: '#333' }}>{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
