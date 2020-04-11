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
          if (doc.data().collection_name === 'providers') {
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
          if (doc.data().collection_name === 'providers') {
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

export const getProvidersCount = () => {
  return new Promise((resolve, reject) => {
    fire.collection('counters')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          reject(new Error(404));
        }
        snapshot.forEach(doc => {
          if (doc.data().collection_name == 'providers') {
            resolve(parseInt(doc.data().collection_count));
          }
        });
        resolve(0)
      });
    });
}

export const getAllProviders = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fire.collection('providers')
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

export const getProviders = (page = null, orderBy = 'name') => {
  return new Promise((resolve, reject) => {
    const results = [];
    let index = 0;
  
    if (page && page > 1) {
      index = (page -1) * 20;
    }
    fire.collection('providers')
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

export const createProvider = (providerObject) => {
  const created = moment();
  providerObject['created_at'] = created.toISOString();
  return new Promise((resolve, reject) => {
    fire.collection('providers')
      .add(providerObject)
      .then(newProvider => {
        const newProv = newProvider;
        incrementCounter()
          .then(response => resolve(newProv))
      })
      .catch(err => {
        resolve(err);
      });
  });
}

export const deleteProvider = (providerId) => {
  return new Promise( async (resolve, reject) => {
    await fire.collection('providers').doc(providerId).delete();
    await decrementCounter();
    resolve(providerId);
  });
} 