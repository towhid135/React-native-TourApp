import * as SQLite from 'expo-sqlite';

/*If database is exists then it will be opened or the database will be created
with this name to the document directory of the file FileSystem. */
const db = SQLite.openDatabase('places.db');

export const init = () =>{

    /*When new Promise called, initially the promise variable contains two value {status: 'pending',result: undefined}
    . When we call resolve(value) on success then the promise variable have values like {status: 'fulfilled',result: value}
    When we call reject on failure, then {status: 'rejected',result: error}*/
    const promise = new Promise((resolve,reject) => {
    /*The transaction takes a function and passes a transaction object as its 
    argument . The transaction ensures that the query runs as a whole, so that 
    the database doesn't fill with corrupted data. If there is error in the query 
    then it will roll back the query. */
    db.transaction((tx) => {
        /* Here places is the table inside places db, and inside the first
        bracket we declare the attributes of that table */
        tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)',
        [],
        () => {
            resolve();
        },
        (_,err) => {
            reject(err);
        }
        );
    })
  })

  return promise;
}

export const insertPlace = (title,imageUri,address,lat,lng) => {
    const promise = new Promise((resolve,reject) => {
        
        db.transaction((tx) => {
            /* If we directly insert the values to the VALUES like "VALUES(title,imageUri...)" then there is
            a probability of SQL injection. For that reason we have used placeholder (?). Each place holder
            takes values from the third bracked sequentially*/
            tx.executeSql(`INSERT INTO places(title,imageUri,address,lat,lng) VALUES (?,?,?,?,?)`,
            [title,imageUri,address,lat,lng],
            (_,result) => {
                resolve(result);
            },
            (_,err) => {
                reject(err);
            }
            );
        })
      })
    return promise;
}