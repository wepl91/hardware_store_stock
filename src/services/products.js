import fire from '../fire';
const moment = require('moment');

// Internal method to update counter when product is created
const incrementCounter = () => {
  return new Promise((resolve, reject) => {
    fire.collection('counters')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          reject(new Error(404));
        }
        snapshot.forEach(doc => {
          if (doc.data().collection_name === 'products') {
            let currentCount = parseInt(doc.data().collection_count);
            currentCount = currentCount + 1;
            fire.collection('counters')
              .doc(doc.id)
              .update({collection_count: currentCount})
              .then(response => {
                resolve(currentCount);
              });
          }
        });
      });
    });
} 

// Internal method to update counter when product is deleted
const decrementCounter = () => {
  return new Promise((resolve, reject) => {
    fire.collection('counters')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          reject(new Error(404));
        }
        snapshot.forEach(doc => {
          if (doc.data().collection_name === 'products') {
            let currentCount = parseInt(doc.data().collection_count);
            currentCount = currentCount - 1;
            fire.collection('counters')
              .doc(doc.id)
              .update({collection_count: currentCount})
              .then(response => {
                resolve(currentCount);
              });
          }
        });
      });
    });
} 

export const getProductsCount = () => {
  return new Promise((resolve, reject) => {
    fire.collection('counters')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          reject(new Error(404));
        }
        snapshot.forEach(doc => {
          if (doc.data().collection_name == 'products') {
            resolve(parseInt(doc.data().collection_count));
          }
        });
        resolve(0)
      });
    });
}

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fire.collection('products')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          reject(new Error(404));
        }
        snapshot.forEach(doc => {
          let prod = Object.assign({}, doc.data(), {id: doc.id})
          results.push(prod);
        });
        resolve(results);
      });
  })
}

export const getProducts = (page = null, orderBy = 'name') => {
  return new Promise((resolve, reject) => {
    const results = [];
    let index = 0;
  
    if (page && page > 1) {
      index = (page -1) * 20;
    }
    fire.collection('products')
      .orderBy(orderBy)
      .startAt(index)
      .limit(20)
      .get()
      .then(snapshot => {
      if (snapshot.empty) {
        reject(new Error(404));
      }
      snapshot.forEach(doc => {
        let prod = Object.assign({}, doc.data(), {id: doc.id})
        results.push(prod);
      });
      resolve(results)
    })
  });
}

export const createProduct = (productObject) => {
  const created = moment();
  productObject['created_at'] = created.toISOString();
  return new Promise((resolve, reject) => {
    fire.collection('products')
      .add(productObject)
      .then(newProduct => {
        incrementCounter()
          .then(response => resolve(newProduct))
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const deleteProduct = (productId) => {
  return new Promise( async (resolve, reject) => {
    await fire.collection('products').doc(productId).delete();
    await decrementCounter();
    resolve(productId);
  });
} 