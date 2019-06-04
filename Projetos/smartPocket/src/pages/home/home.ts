import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewEntryPage } from '../new-entry/new-entry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { initServicesIfNeeded } from '@angular/core/src/view';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
   public sqlite: SQLite) { }

  addEntry(){
    console.log("Adicionar lançamento");
    this.navCtrl.push(NewEntryPage);
  } 
  testeDb(){
    console.log('Inicio do Teste DB');
    
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      console.log('BD criado');
      

      // Executa o comando de create table
      this.createTable(db)
      .then(() => {
        console.log('Tabelas Criadas');
      this.select(db)

        .then((values: any) => {
        for(var i = 0; i < values.rows.length; i++){
        console.log(JSON.stringify(values.rows.item(i)));
        }

        console.log('------------------------');

        this.balance(db)
        .then((values: any) => {
        if(values.rows.length > 0){
        const i = values.rows.item(0);
        console.log("Saldo atual", JSON.stringify(i.balance));
          }
        });
      });
  })
      
    })
    .catch(() => { 
        console.error('Erro ao criar BD.') 
    });
  }

  createTable(db) {

    return db.sqlBatch([
      "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
    ])
    .catch(e => console.error('erro ao criar a tabela', JSON.stringify(e)));
  }

  insert (v1, v2, db) {
      // Inseri um valor qualquer
    const sql = "INSERT INTO entries (amount, description) VALUES (?, ?)";
    const data = [v1, v2];
    return db.executeSql(sql, data)
    .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
  }

  update(v1, v2, id, db){
    const sql = "UPDATE entries SET amount = ?, description = ? WHERE id  = ?";
    const data = [v1, v2, id];
    
    return db.executeSql(sql, data)
    .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));

  }
  
  delete(id, db){
    const sql = "DELETE FROM entries WHERE ID = ?";
    const data = [id];
    return db.executeSql(sql, data)
    .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
  }

  select (db){
    const sql = "SELECT * FROM entries;";
    const data = [];
    return db.executeSql(sql, data)
    .catch(e => console.error('erro ao selecionar registros', JSON.stringify(e)));
  }
  balance (db) {
    const sql = "SELECT SUM(amount) AS balance FROM entries;";
    const data = [];
    
    return db.executeSql(sql, data)
    .catch(e => console.error('erro ao selecionar registros', JSON.stringify(e)));

  }

}