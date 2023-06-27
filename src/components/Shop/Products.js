import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const PRODUCT_ITEMS = [
    {id : 'p1', price: 6, title: 'First Book', description: 'My First book'},
    {id : 'p2', price: 5, title: 'Second Book', description: 'My Second book'}
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCT_ITEMS.map((item) =>(  
          <ProductItem
            key={item.id}
            id ={item.id} 
            title ={item.title}
            price={item.price}
            description={item.description}
          />)
        )}
      </ul>
    </section>
  );
};

export default Products;
