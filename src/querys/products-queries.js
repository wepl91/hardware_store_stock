import fire from '../fire';

export const getAllProducts = () => {
  const results = [];
  fire.collection('products').get().then(snapshot => {
    if (snapshot.empty) {
      throw new Error(404);
    }

    snapshot.forEach(doc => {
      let prod = Object.assign({}, doc.data(), {id: doc.id})
      results.push(prod);
    });
    return results
  });
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