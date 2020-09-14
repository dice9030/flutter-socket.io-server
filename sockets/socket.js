const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand(new Band('El gran combo'));
bands.addBand(new Band('Grupo 5'));
bands.addBand(new Band('Armonia 10'));
bands.addBand(new Band('Hector Lavoe'));


console.log(bands);

io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { 
        console.log('Desconectado');
     });
     client.on('mensaje', (payload) => { 
        console.log('Mensaje', payload);
        io.emit('mensaje',{admin:'Nuevo mensaje'});
     });

     client.on('emitir-mensaje', (payload) => {    
        //  io.emit('nuevo-mensaje','JEJEJE');//mensaje para todos
       console.log(payload);
        client.broadcast.emit('nuevo-mensaje',payload); //mensaje para todos menos para el que emitio
     });

     client.on('vote-band', (payload) => {    
        //  io.emit('nuevo-mensaje','JEJEJE');//mensaje para todos
    //    console.log(payload);te
       bands.voteBand(payload.id);
       io.emit('active-bands',bands.getBands()); // io : para todos | client: solo mi cliente
        // client.broadcast.emit('nuevo-mensaje',payload); //mensaje para todos menos para el que emitio
     });

     client.on('add-band', (payload) => {    
      
      bands.addBand(new Band(payload.name));
      io.emit('active-bands',bands.getBands()); // io : para todos | client: solo mi cliente
      
     });

     client.on('add-band', (payload) => {    
      
       bands.deleteBand(payload.id);
       io.emit('active-bands',bands.getBands()); // io : para todos | client: solo mi cliente
      
     });

     client.on('delete-band', (payload) => {    
      
      bands.deleteBand(payload.id);
      io.emit('active-bands',bands.getBands()); // io : para todos | client: solo mi cliente
     
    });


     


  });