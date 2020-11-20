import React from 'react';

function Gallery({ component: Component, items, itemProps }) {
  return (
    <section className="gallery">
      <ul className="gallery__items">
        {
          items.map((item, index) => (
            <Component
              key={index}
              item={item}
              {...itemProps}
            />
          ))
        }
      </ul>
    </section>
  );
}

export default Gallery;
